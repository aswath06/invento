import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { moderateScale } from '../utils/scalingUtils';
import { DashboardCards, StatsCard } from '../components';

export const Dashboard = () => {
  const sections = [
    {
      title: "Add Product",
      items: [
        { label: "Add New Product", icon: "box", color: "#F97316", navigateTo: "AppProduct" },
      ],
    },
    {
      title: "Transactions",
      items: [
        { label: "Stock In", icon: "arrow-down", color: "#16A34A", navigateTo: "StockInScreen" },
        { label: "Stock Out", icon: "arrow-up", color: "#DC2626", navigateTo: "StockOutScreen" },
      ],
    },
    {
      title: "Product Management",
      items: [
        { label: "View Products", icon: "view", color: "#3B82F6", navigateTo: "ViewProducts" },
        { label: "Update Product", icon: "update", color: "#F59E0B", navigateTo: "UpdateProduct" },
      ],
    },
    {
      title: "People Management",
      items: [
        { label: "Vendors", icon: "vendors", color: "#16A34A", navigateTo: "VendorsScreen" },
        { label: "Customers", icon: "customers", color: "#F59E0B", navigateTo: "CustomersScreen" },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.heading}>Aswath Hollow Bricks</Text>

        <StatsCard
          stockIn="1200"
          stockOut="800"
          turnover="₹15,000"
          profit="₹3,200"
          width="100%"
          height={180}
        />
          <DashboardCards sections={sections} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: moderateScale(30),
  },
  heading: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    letterSpacing: 1,
    marginTop: moderateScale(15),
  },
});
