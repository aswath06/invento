import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LucideIcon } from "lucide-react-native";
import { moderateScale } from "../../utils/scalingUtils";

interface CustomInputBoxProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  required?: boolean;
  placeholder?: string;
  endIcon?: React.ReactElement<typeof LucideIcon>;
  editable?: boolean;
  onIconPress?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
}

export const CustomInputBox: React.FC<CustomInputBoxProps> = ({
  label,
  value,
  onChangeText,
  required,
  placeholder,
  endIcon,
  editable = true,
  onIconPress,
  multiline = false,
  numberOfLines = 1,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      <View style={styles.inputBox}>
        <TextInput
          style={[
            styles.input,
            multiline && { height: moderateScale(80), textAlignVertical: "top" },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          editable={editable}
          placeholderTextColor="#999"
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        {endIcon && (
          <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
            {endIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: moderateScale(8),
  },
  label: {
    fontSize: moderateScale(14),
    color: "#222",
    fontWeight: "600",
    marginBottom: moderateScale(4),
  },
  required: {
    color: "red",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: moderateScale(14),
    color: "#000",
    paddingVertical: 0,
  },
  iconContainer: {
    marginLeft: moderateScale(6),
  },
});
