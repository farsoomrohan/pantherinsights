import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { scaleWidth, scaleHeight, scaleFont, scaleBoth} from '../app/responsiveScaling';

type PropType = {
  slides: string[];
};

const Carousel: React.FC<PropType> = ({ slides }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { width: windowWidth } = Dimensions.get('window');

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setSelectedIndex(index);
  };

  const onPrevButtonClick = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : slides.length - 1;
    scrollToIndex(newIndex);
  };

  const onNextButtonClick = () => {
    const newIndex = selectedIndex < slides.length - 1 ? selectedIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  const onDotButtonClick = (index: number) => {
    scrollToIndex(index);
  };

  return (
    <View style={styles.embla}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / windowWidth);
          setSelectedIndex(index);
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.emblaSlide, { width: windowWidth }]}>
            <Text style={styles.emblaSlideNumber}>{item + 1}</Text>
          </View>
        )}
      />
      <View style={styles.emblaControls}>
        <TouchableOpacity onPress={onPrevButtonClick}>
          <Text style={styles.controlText}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNextButtonClick}>
          <Text style={styles.controlText}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.emblaDots}>
        {slides.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => onDotButtonClick(index)}>
            <Text style={styles.dot}>{index === selectedIndex ? '●' : '○'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  embla: {
    flex: 1,
    alignItems: 'center',
  },
  emblaSlide: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: scaleBoth(5),
    backgroundColor: '#ddd',
    height: scaleHeight(300),
    width: scaleWidth(150),
  },
  emblaSlideNumber: {
    fontSize: scaleFont(24),
  },
  emblaControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: scaleBoth(10),
  },
  controlText: {
    fontSize: scaleFont(18),
    color: '#fff',
  },
  emblaDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: scaleBoth(10),
    color: '#fff',
  },
  dot: {
    fontSize: scaleFont(24),
    marginHorizontal: scaleWidth(5),
    color: '#fff',
  },
});

export default Carousel;
