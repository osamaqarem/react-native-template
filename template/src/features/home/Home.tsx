import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import {
  Button,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/slices/authslice"
import { RootStackParamsList } from "../navigation/Navigator"
import { RootStoreType } from "../../redux/rootReducer"

interface Props {
  navigation: StackNavigationProp<RootStackParamsList, "Home">
}

const Home = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootStoreType) => state.auth.loading)

  return (
    <SafeAreaView style={styles.container}>
      {(loading && <ActivityIndicator />) || (
        <Button
          onPress={() => dispatch(logout())}
          title="SIGN OUT"
          testID="signOutBtn"
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
})

export default Home
