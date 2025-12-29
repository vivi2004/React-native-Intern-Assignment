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
  const [position, setPosition] = useState([0, 0, -1]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState([1, 1, 1]);
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
      setPosition(dragToPos);
    };

    const onRotate = (rotateState: any, rotationFactor: number, source: any) => {
      if (rotateState === 3) {
        // Rotation ended
        const newRotation = [
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
        const clampedScale = [
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.modelName}>{model.name}</Text>
          <Text style={styles.modelCategory}>{model.category}</Text>
        </View>

        <TouchableOpacity
          style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
          onPress={toggleFavorite}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
            </Text>
          )}
        </TouchableOpacity>

        {!isPlaced && (
          <View style={styles.instructionBox}>
            <Text style={styles.instructionTitle}>Instructions:</Text>
            <Text style={styles.instructionItem}>• Point camera at floor or table</Text>
            <Text style={styles.instructionItem}>• Tap to place model</Text>
            <Text style={styles.instructionItem}>• Pinch to scale</Text>
            <Text style={styles.instructionItem}>• Rotate with two fingers</Text>
            <Text style={styles.instructionItem}>• Drag to move</Text>
          </View>
        )}
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
    borderRadius: 8,
    maxWidth: 200,
  },
  modelName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  modelCategory: {
    color: '#ccc',
    fontSize: 12,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  instructionBox: {
    position: 'absolute',
    bottom: 180,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    borderRadius: 8,
  },
  instructionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  instructionItem: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  instructionText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default ARViewScreen;

