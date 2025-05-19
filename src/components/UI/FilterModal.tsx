import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {FilterModalProps} from '../../types/types';

const STATUS_OPTIONS = ['Alive', 'Dead', 'Unknown'];
const SPECIES_OPTIONS = [
  'Human',
  'Humanoid',
  'Alien',
  'Robot',
  'Animal',
  'Mythological Creature',
  'Cronenberg',
  'Poopybutthole',
];

const FilterModal = ({
  filters,
  onApply,
}: Omit<FilterModalProps, 'visible' | 'onClose'>) => {
  const [visible, setVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>(
    filters.status,
  );
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>(
    filters.species,
  );
  const rotation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    setSelectedStatus(filters.status);
    setSelectedSpecies(filters.species);
  }, [filters]);

  const toggleSelection = (
    option: string,
    current: string[],
    setFn: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (current.includes(option)) {
      setFn(current.filter(item => item !== option));
    } else {
      setFn([...current, option]);
    }
  };

  const handleReset = () => {
    setSelectedStatus([]);
    setSelectedSpecies([]);
  };

  const handleApply = () => {
    onApply({status: selectedStatus, species: selectedSpecies});
    setVisible(false);
    Animated.timing(rotation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const toggleModal = () => {
    const toValue = visible ? 0 : 1;
    setVisible(!visible);
    Animated.timing(rotation, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <>
      <Pressable onPress={toggleModal} style={styles.filterButton}>
        <Text style={styles.filterText}>FILTER</Text>
        <Animated.Image
          source={require('../../../assets/iconArrowUp2.png')}
          style={[styles.chevron, {transform: [{rotate}]}]}
        />
      </Pressable>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.sectionLabel}>STATUS</Text>
            {STATUS_OPTIONS.map(option => (
              <Pressable
                key={option}
                onPress={() =>
                  toggleSelection(option, selectedStatus, setSelectedStatus)
                }
                style={styles.checkboxRow}>
                <View style={styles.checkbox}>
                  {selectedStatus.includes(option) && (
                    <Image
                      source={require('../../../assets/iconCheck.png')}
                      style={styles.checkIcon}
                    />
                  )}
                </View>
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}

            <Text style={styles.sectionLabel}>SPECIES</Text>
            {SPECIES_OPTIONS.map(option => (
              <Pressable
                key={option}
                onPress={() =>
                  toggleSelection(option, selectedSpecies, setSelectedSpecies)
                }
                style={styles.checkboxRow}>
                <View style={styles.checkbox}>
                  {selectedSpecies.includes(option) && (
                    <Image
                      source={require('../../../assets/iconCheck.png')}
                      style={styles.checkIcon}
                    />
                  )}
                </View>
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}

            <View style={styles.buttonsRow}>
              <Pressable onPress={handleReset} style={styles.resetBtn}>
                <Text style={styles.resetText}>RESET</Text>
              </Pressable>
              <Pressable onPress={handleApply} style={styles.applyBtn}>
                <Text style={styles.applyText}>APPLY</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#224229',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
    marginLeft: 16,
  },
  filterText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 1.1,
  },
  chevron: {
    marginLeft: 6,
    width: 14,
    height: 14,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContainer: {
    position: 'absolute',
    top: '20%',
    alignSelf: 'center',
    maxWidth: 360,
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderColor: '#224229',
    borderWidth: 1,
    padding: 16,
    zIndex: 1000,
    elevation: 10,
  },
  modalContent: {
    paddingBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
    marginTop: 12,
    marginBottom: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#224229',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    width: 12,
    height: 12,
    tintColor: '#224229',
  },
  optionText: {
    fontSize: 14,
    color: '#111827',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetBtn: {
    borderWidth: 1,
    borderColor: '#224229',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  resetText: {
    color: '#224229',
    fontWeight: '600',
  },
  applyBtn: {
    backgroundColor: '#224229',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  applyText: {
    color: '#fff',
    fontWeight: '600',
  },
});
