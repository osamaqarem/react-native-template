import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import {
  Button,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native"
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen"
import { RootStackParamsList } from "../navigation/Navigator"
import BuildConfig from "react-native-config"

declare let global: { HermesInternal: null | {} }

interface Props {
  navigation: StackNavigationProp<RootStackParamsList, "Landing">
}

const Landing = ({ navigation }: Props) => {
  const goHome = () => navigation.navigate("Home")

  return (
    <View>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <Text style={styles.env}>
        Environment:{" "}
        <Text
          style={{
            fontWeight: "600",
          }}
        >
          {BuildConfig.ENV}
        </Text>
      </Text>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <Header />
        <Text style={styles.templateTitle} testID="title">
          @osamaq/react-native-template
        </Text>
        {global.HermesInternal == null ? null : (
          <View style={styles.engine}>
            <Text style={styles.footer}>Engine: Hermes</Text>
          </View>
        )}
        <View style={styles.body}>
          <View style={styles.signinBtn}>
            <Button
              title="NAVIGATE HOME"
              onPress={goHome}
              testID="goHomeBtn"
              color="lightpink"
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Step One</Text>
            <Text style={styles.sectionDescription}>
              Edit <Text style={styles.highlight}>Landing.tsx</Text> to change
              this screen and then come back to see your edits.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>See Your Changes</Text>
            <Text style={styles.sectionDescription}>
              <ReloadInstructions />
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Debug</Text>
            <Text style={styles.sectionDescription}>
              <DebugInstructions />
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Learn More</Text>
            <Text style={styles.sectionDescription}>
              Read the docs to discover what to do next:
            </Text>
          </View>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
  env: {
    fontSize: 16,
    color: Colors.black,
    textAlign: "left",
    position: "absolute",
    top: 6,
    left: 6,
    zIndex: 1,
  },
  templateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
    textAlign: "center",
    bottom: 10,
  },
  signinBtn: {
    position: "absolute",
    minWidth: 100,
    right: 10,
    top: 10,
  },
})

export default Landing
