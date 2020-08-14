import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import useSwr from "swr"
import Space from "../../common/components/abstract/Space"
import { base64Util } from "../../common/helpers/base64Util"
import { RootStoreType } from "../../redux/rootReducer"
import { exampleActions } from "../../redux/slices/exampleSlice"
import { githubService } from "../../services/network/github/githubService"
import { RepoReadme } from "../../services/network/github/models"
import { RootStackParamsList } from "../navigation/Navigator"

interface Props {
  navigation: StackNavigationProp<RootStackParamsList, "Home">
}

const Home = ({}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Space.V s={8} />
        <ReduxExample />
        <Space.V s={8} />
        <DataFetchingExample />
      </View>
    </SafeAreaView>
  )
}

const ReduxExample = () => {
  /**
   * Redux hooks example
   */
  const dispatch = useDispatch()
  const globalValue = useSelector(
    (state: RootStoreType) => state.example.globalValue
  )

  const ping = () => {
    if (globalValue === "PING") {
      dispatch(exampleActions.pong())
    } else {
      dispatch(exampleActions.ping())
    }
  }

  return (
    <>
      <Text style={styles.header}>Redux Example</Text>
      <Space.V s={8} />
      <Button onPress={ping} title={`Dispatch ${globalValue}`} />
    </>
  )
}

const DataFetchingExample = () => {
  /**
   * Data fetching example
   */
  const { data, error } = useSwr<RepoReadme>(
    githubService.paths.getRepoReadme(),
    githubService.client.get
  )

  if (error) return <Text>failed to load</Text>
  if (!data) return <ActivityIndicator color="blue" size={30} />

  return (
    <>
      <Text style={styles.header}>Data Fetching Example</Text>
      <Space.V s={8} />
      <ScrollView style={styles.scrollView}>
        <Text>{base64Util.atob(data.content.trim())}</Text>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "white" },
  innerContainer: { marginHorizontal: 12 },
  scrollView: {
    flexGrow: 1,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#e9e9e9",
  },
  pingPong: {
    flexDirection: "row",
    flex: 1,
  },
  header: {
    alignSelf: "flex-start",
    fontSize: 20,
  },
})

export default Home
