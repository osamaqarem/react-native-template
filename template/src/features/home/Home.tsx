import { StackNavigationProp } from "@react-navigation/stack"
import { ApiResponse } from "apisauce"
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
import { exampleSliceActions } from "../../redux/slices/exampleSlice"
import { githubService } from "../../services/network/github/githubService"
import { RepoReadme } from "../../services/network/github/models"
import { RootStackParamsList } from "../navigation/Navigator"

interface Props {
  navigation: StackNavigationProp<RootStackParamsList, "Home">
}

const Home = ({}: Props) => {
  /**
   * Redux hooks example
   */
  const dispatch = useDispatch()
  const globalValue = useSelector(
    (state: RootStoreType) => state.example.globalValue
  )

  const ping = () => {
    if (globalValue === "PING") {
      dispatch(exampleSliceActions.pong())
    } else {
      dispatch(exampleSliceActions.ping())
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Space.V s={8} />
      <Text style={styles.header}>Redux Example</Text>
      <Space.V s={8} />
      <Button onPress={ping} title={`Dispatch ${globalValue}`} />
      <Space.V s={8} />
      <DataFetchingExample />
    </SafeAreaView>
  )
}

const DataFetchingExample = () => {
  /**
   * Data fetching example
   */
  const { data: result, error } = useSwr<ApiResponse<RepoReadme>>(
    githubService.paths.getRepoReadme(),
    githubService.client.get
  )

  if (error) return <Text>failed to load</Text>
  if (!result) return <ActivityIndicator color="blue" size={30} />

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Data Fetching Example</Text>
      <Space.V s={8} />
      <ScrollView style={styles.block}>
        <Text>{base64Util.atob(result.data?.content.trim())}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "white" },
  block: {
    flexGrow: 1,
    marginHorizontal: 12,
    padding: 16,
    backgroundColor: "#e9e9e9",
  },
  pingPong: {
    flexDirection: "row",
    flex: 1,
  },
  header: {
    marginLeft: 12,
    alignSelf: "flex-start",
    fontFamily: "montserrat_bold",
    fontSize: 20,
  },
})

export default Home
