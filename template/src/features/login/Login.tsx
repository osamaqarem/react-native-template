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
  ActivityIndicator
} from "react-native"
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen"
import { useDispatch, useSelector } from "react-redux"
import { doAuth } from "../../redux/slices/authslice"
import { RootStackParamsList } from "../navigation/Navigator"
import { RootStoreType } from "../../redux/rootReducer"

declare let global: { HermesInternal: null | {} }

type Props = {
  navigation: StackNavigationProp<RootStackParamsList, "Login">
}

const Login = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootStoreType) => state.auth.loading)

  const signin = () => dispatch(doAuth())

  return (
    <View>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <Header />
        <Text style={styles.templateTitle}>@osamaq/react-native-template</Text>
        {global.HermesInternal == null ? null : (
          <View style={styles.engine}>
            <Text style={styles.footer}>Engine: Hermes</Text>
          </View>
        )}
        <View style={styles.body}>
          <View style={styles.signinBtn}>
            {(loading && (
              <ActivityIndicator color="" style={{ top: 10 }} />
            )) || <Button title="SIGN IN" onPress={signin} />}
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Step One</Text>
            <Text style={styles.sectionDescription}>
              Edit <Text style={styles.highlight}>Login.tsx</Text> to change
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
    backgroundColor: Colors.lighter
  },
  engine: {
    position: "absolute",
    right: 0
  },
  body: {
    backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark
  },
  highlight: {
    fontWeight: "700"
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right"
  },
  templateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
    textAlign: "center",
    bottom: 10
  },
  signinBtn: {
    position: "absolute",
    minWidth: 100,
    right: 10,
    top: 10
  }
})

export default Login
