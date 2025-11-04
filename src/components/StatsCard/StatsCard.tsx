import React, { useState } from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { moderateScale } from '../../utils/scalingUtils';

interface StatsCardProps {
  stockIn: string | number;
  stockOut: string | number;
  turnover: string | number;
  profit: string | number;
  width?: number | string;
  height?: number;
  style?: ViewStyle;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  stockIn,
  stockOut,
  turnover,
  profit,
  width = '90%',
  height = moderateScale(150),
  style,
}) => {
  const [showValues, setShowValues] = useState(false);
  const toggleVisibility = () => setShowValues(!showValues);

  return (
    <LinearGradient
      colors={['#FF6A00', '#EE0979']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, { width, height }, style]}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Today</Text>
        <TouchableOpacity onPress={toggleVisibility}>
          {showValues ? (
            <EyeOffIcon color="#fff" size={moderateScale(22)} />
          ) : (
            <EyeIcon color="#fff" size={moderateScale(22)} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Stock In</Text>
          <Text style={styles.value}>{showValues ? stockIn : '***'}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Stock Out</Text>
          <Text style={styles.value}>{showValues ? stockOut : '***'}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Turnover</Text>
          <Text style={styles.value}>{showValues ? turnover : '***'}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Profit</Text>
          <Text style={styles.value}>{showValues ? profit : '***'}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  headerText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    flex: 1,
  },
  label: {
    fontSize: moderateScale(14),
    color: '#fff',
    opacity: 0.8,
  },
  value: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#fff',
    marginTop: moderateScale(4),
  },
});
