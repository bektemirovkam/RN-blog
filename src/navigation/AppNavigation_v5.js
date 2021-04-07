import React from "react";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Platform, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import { MainScreen } from "../screens/MainScreen";
import { PostScreen } from "./../screens/PostScreen";
import { THEME } from "./../theme";
import { AppHeaderButton } from "./../components/ui/AppHeaderButton";
import { BookedScreen } from "./../screens/BookedScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AboutScreen } from "./../screens/AboutScreen";
import { CreateScreen } from "./../screens/CreateScreen";

const PostStack = createStackNavigator();

const navScreenOption = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
  },
  headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
};

const Buttons = (title, iconsName, onPress) => () => (
  <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
    <Item title={title} iconName={iconsName} onPress={onPress} />
  </HeaderButtons>
);

const PostNavigationScreen = () => {
  return (
    <PostStack.Navigator
      initialRouteName="Main"
      screenOptions={navScreenOption}
    >
      <PostStack.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }) => ({
          headerTitle: "Мой блог",
          headerRight: Buttons("camera", "camera", () => {
            alert("camera");
          }),
          headerLeft: Buttons("toggle drawer", "menu", () => {
            navigation.toggleDrawer();
          }),
        })}
      />
      <PostStack.Screen
        name="Post"
        component={PostScreen}
        options={({ route }) => ({
          headerTitle: `Пост № ${route.params.postId}`,
          headerRight: Buttons(
            "booked",
            route.params.booked ? "star-outline" : "star",
            () => {
              alert("booked");
            }
          ),
        })}
      />
    </PostStack.Navigator>
  );
};

const AboutStack = createStackNavigator();

const AboutNavigationScreen = () => {
  return (
    <AboutStack.Navigator screenOptions={navScreenOption}>
      <AboutStack.Screen
        name="About"
        component={AboutScreen}
        options={({ navigation }) => ({
          headerTitle: "О приложении",
          headerRight: Buttons("camera", "camera", () => {
            alert("camera");
          }),
          headerLeft: Buttons("toggle drawer", "menu", () => {
            navigation.toggleDrawer();
          }),
        })}
      />
    </AboutStack.Navigator>
  );
};

const CreateStack = createStackNavigator();

const CreateNavigationScreen = () => {
  return (
    <CreateStack.Navigator screenOptions={navScreenOption}>
      <CreateStack.Screen
        name="Create"
        component={CreateScreen}
        options={({ navigation }) => ({
          headerTitle: "Создать пост",
          headerLeft: Buttons("toggle drawer", "menu", () => {
            navigation.toggleDrawer();
          }),
        })}
      />
    </CreateStack.Navigator>
  );
};

const BookedStack = createStackNavigator();

const BookedNavigationScreen = () => (
  <BookedStack.Navigator screenOptions={navScreenOption}>
    <BookedStack.Screen
      name="Booked"
      component={BookedScreen}
      options={{
        headerTitle: "Избранное",
        headerLeft: Buttons("toggle drawer", "menu", () => {
          alert("menu");
        }),
      }}
    />
    <BookedStack.Screen
      name="Post"
      component={PostScreen}
      options={({ route }) => ({
        headerTitle: `Пост № ${route.params.postId}`,
        headerRight: Buttons(
          "booked",
          route.params.booked ? "star-outline" : "star",
          () => {
            alert("booked");
          }
        ),
      })}
    />
  </BookedStack.Navigator>
);

const TabStack =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const androidConfig = {
  activeColor: "#f0edf6",
  inactiveColor: "#3e2465",
  barStyle: { backgroundColor: THEME.MAIN_COLOR },
  shifting: true,
};

const iosConfig = {
  tabBarOptions: {
    activeTintColor: THEME.MAIN_COLOR,
  },
};

const currentConfig =
  Platform.OS === "android" ? { ...androidConfig } : { ...iosConfig };

const TabNavigationScreen = () => (
  <TabStack.Navigator
    {...currentConfig}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === "Main") {
          iconName = "ios-albums";
        } else if (route.name === "Booked") {
          iconName = "star";
        }

        return <Ionicons name={iconName} size={21} color={color} />;
      },
    })}
  >
    <TabStack.Screen
      name="Main"
      component={PostNavigationScreen}
      options={{ tabBarLabel: "Все" }}
    />
    <TabStack.Screen
      name="Booked"
      component={BookedNavigationScreen}
      options={{ tabBarLabel: "Избранное" }}
    />
  </TabStack.Navigator>
);

const DrawerStack = createDrawerNavigator();

const DrawerNavigationScreen = () => (
  <DrawerStack.Navigator>
    <DrawerStack.Screen
      name="Main"
      component={TabNavigationScreen}
      options={{ drawerLabel: "Главная" }}
    />
    <DrawerStack.Screen
      name="About"
      component={AboutNavigationScreen}
      options={{ drawerLabel: "О приложении" }}
    />
    <DrawerStack.Screen
      name="Create"
      component={CreateNavigationScreen}
      options={{ drawerLabel: "Создать пост" }}
    />
  </DrawerStack.Navigator>
);

export const AppNavigation = () => (
  <NavigationContainer>
    <DrawerNavigationScreen />
  </NavigationContainer>
);
