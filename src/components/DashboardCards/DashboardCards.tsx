import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Box,
  ArrowDown,
  ArrowUp,
  Pencil,
  Eye,
  Store,
  User,
  ChevronRight,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { moderateScale } from "../../utils/scalingUtils";

interface ItemProps {
  label: string;
  icon: string;
  color?: string;
  navigateTo: string;
}

interface SectionProps {
  title: string;
  items: ItemProps[];
}

interface DashboardCardsProps {
  sections: SectionProps[];
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({ sections }) => {
  const navigation = useNavigation<any>();

  const renderIcon = (icon: string, color?: string) => {
    const iconSize = moderateScale(20);
    switch (icon) {
      case "box":
        return <Box color={color} size={iconSize} />;
      case "arrow-down":
        return <ArrowDown color={color} size={iconSize} />;
      case "arrow-up":
        return <ArrowUp color={color} size={iconSize} />;
      case "update":
        return <Pencil color={color} size={iconSize} />;
      case "view":
        return <Eye color={color} size={iconSize} />;
      case "vendors":
        return <Store color={color} size={iconSize} />;
      case "customers":
        return <User color={color} size={iconSize} />;
      default:
        return <Box color={color} size={iconSize} />;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {sections.map((section, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{section.title}</Text>
          {section.items.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.row}
              onPress={() => navigation.navigate(item.navigateTo)}
            >
              <View style={styles.rowLeft}>
                {renderIcon(item.icon, item.color)}
                <Text style={styles.rowText}>{item.label}</Text>
              </View>
              <ChevronRight size={moderateScale(20)} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F6FA",
    marginTop: moderateScale(20),
    paddingHorizontal: moderateScale(8),
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: moderateScale(18),
    fontWeight: "700",
    color: "#000",
    marginBottom: moderateScale(12),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: moderateScale(10),
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowText: {
    fontSize: moderateScale(16),
    color: "#222",
    marginLeft: moderateScale(10),
  },
});
