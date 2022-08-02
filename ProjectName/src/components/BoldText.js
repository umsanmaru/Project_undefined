import React from "react"
import { StyleSheet, Text } from "react-native"

export function defaultBoldText(props) {
  return <Text style={[styles.defaultFontText, props.style]}>{props.children}</Text>
}

const styles = StyleSheet.create({
  defaultFontText: {
    fontFamily: "AppleSDGothicNeoB00"
  },
})