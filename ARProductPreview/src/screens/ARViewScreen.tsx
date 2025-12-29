import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  ViroText,
  ViroBox,
} from '@viro-community/react-viro';
import { favoritesAPI } from '../services/api';
import { Model } from '../types';
import { useAuth } from '../context/AuthContext';

interface ARViewScreenProps {
  route: {
    params: {
      model: Model;
    };
  };
  navigation: any;
}

const ARViewScreen = ({ route, navigation }: ARViewScreenProps) => {
  const { model } = route.params;
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // Model state
  const modelRef = useRef<any>(null);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, -1]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [scale, setScale] = useState<[number, number, number]>([1, 1, 1]);
  const [isPlaced, setIsPlaced] = useState(false);

  // Check if favorite on mount
  React.useEffect(() => {
    if (isAuthenticated) {
      checkFavorite();
    }
  }, [model._id, isAuthenticated]);

  const checkFavorite = async () => {
    try {
      const response = await favoritesAPI.check(model._id);
      setIsFavorite(response.data.isFavorite);
    } catch (error) {
      console.error('Check favorite error:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      Alert.alert('Login Required', 'Please login to add favorites');
      return;
    }

    setLoading(true);
    try {
      if (isFavorite) {
        await favoritesAPI.remove(model._id);
        setIsFavorite(false);
      } else {
        await favoritesAPI.add(model._id);
        setIsFavorite(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update favorite');
    } finally {
      setLoading(false);
    }
  };

  const ARScene = () => {
    const onInitialized = (state: any, reason: any) => {
      if (state === 3) {
        // TRACKING_NORMAL
        console.log('AR tracking initialized');
      }
    };

    const onAnchorFound = () => {
      setIsPlaced(true);
    };

    const onDrag = (dragToPos: number[]) => {
      setPosition([dragToPos[0], dragToPos[1], dragToPos[2]] as [number, number, number]);
    };

    const onRotate = (rotateState: any, rotationFactor: number, source: any) => {
      if (rotateState === 3) {
        // Rotation ended
        const newRotation: [number, number, number] = [
          rotation[0],
          rotation[1] + rotationFactor * 180,
          rotation[2],
        ];
        setRotation(newRotation);
      }
    };

    const onPinch = (pinchState: any, scaleFactor: number, source: any) => {
      if (pinchState === 3) {
        // Pinch ended
        const newScale = [
          scale[0] * scaleFactor,
          scale[1] * scaleFactor,
          scale[2] * scaleFactor,
        ];
        // Limit scale between 0.5 and 3
        const clampedScale: [number, number, number] = [
          Math.max(0.5, Math.min(3, newScale[0])),
          Math.max(0.5, Math.min(3, newScale[1])),
          Math.max(0.5, Math.min(3, newScale[2])),
        ];
        setScale(clampedScale);
      }
    };

    const onTap = () => {
      if (!isPlaced) {
        setIsPlaced(true);
      }
    };

    return (
      <ViroARScene onTrackingUpdated={onInitialized}>
        <ViroAmbientLight color="#ffffff" intensity={200} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={45}
          direction={[0, -1, 0]}
          position={[0, 5, 0]}
          color="#ffffff"
          castsShadow={true}
        />

        {!isPlaced && (
          <ViroText
            text="Point camera at a flat surface and tap to place"
            position={[0, 0.5, -1]}
            style={styles.instructionText}
          />
        )}

        <ViroNode
          position={position}
          rotation={rotation}
          scale={scale}
          dragType="FixedToPlane"
          onDrag={onDrag}
          onRotate={onRotate}
          onPinch={onPinch}
          onClick={onTap}
          ref={modelRef}>
          {isPlaced && (
            <Viro3DObject
              source={{ uri: model.modelUrl }}
              resources={[]}
              type="GLB"
              position={[0, 0, 0]}
              scale={[model.scale || 1, model.scale || 1, model.scale || 1]}
              onLoadStart={() => console.log('Loading model...')}
              onLoadEnd={() => console.log('Model loaded')}
              onError={(error: any) => {
                console.error('Model load error:', error);
                Alert.alert('Error', 'Failed to load 3D model. Please check the model URL.');
              }}
            />
          )}
        </ViroNode>
      </ViroARScene>
    );
  };

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{ scene: ARScene }}
        style={styles.arView}
      />

      <View style={styles.controls}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <Text style={styles.modelName} numberOfLines={1}>
              {model.name}
            </Text>
            <Text style={styles.modelCategory}>{model.category}</Text>
          </View>
        </View>

        {/* Instructions */}
        {!isPlaced && (
          <View style={styles.instructionBox}>
            <View style={styles.instructionHeader}>
              <Text style={styles.instructionIcon}>📱</Text>
              <Text style={styles.instructionTitle}>AR Instructions</Text>
            </View>
            <View style={styles.instructionList}>
              <View style={styles.instructionRow}>
                <Text style={styles.instructionBullet}>1</Text>
                <Text style={styles.instructionItem}>Point camera at floor or table</Text>
              </View>
              <View style={styles.instructionRow}>
                <Text style={styles.instructionBullet}>2</Text>
                <Text style={styles.instructionItem}>Tap to place model</Text>
              </View>
              <View style={styles.instructionRow}>
                <Text style={styles.instructionBullet}>3</Text>
                <Text style={styles.instructionItem}>Pinch to scale • Rotate • Drag to move</Text>
              </View>
            </View>
          </View>
        )}

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
            onPress={toggleFavorite}
            disabled={loading}
            activeOpacity={0.8}>
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
                <Text style={styles.favoriteButtonText}>
                  {isFavorite ? 'Favorited' : 'Add to Favorites'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arView: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  infoContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  modelName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  modelCategory: {
    color: '#E5E7EB',
    fontSize: 13,
    fontWeight: '500',
  },
  instructionBox: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  instructionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  instructionIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  instructionTitle: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: '700',
  },
  instructionList: {
    gap: 12,
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  instructionBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  instructionItem: {
    flex: 1,
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  favoriteButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  favoriteButtonActive: {
    backgroundColor: '#FF3B30',
    shadowColor: '#FF3B30',
  },
  favoriteIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  instructionText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default ARViewScreen;

