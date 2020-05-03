import React, { useEffect, useState } from "react";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Headline,
  Text
} from "react-native-paper";
import { View } from "react-native";

const Details = ({ repoInfo, visible, _showDialog, _hideDialog }) => {
  console.log(repoInfo);
  return (
    repoInfo && (
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={_hideDialog}>
            <Dialog.Title>
              # id: {repoInfo.id}, {repoInfo.owner.login}
            </Dialog.Title>
            <Dialog.Content>
              <Headline>repo: {repoInfo.name}</Headline>
              <Paragraph>
                Starts: {repoInfo.stargazers_count}
              </Paragraph>
              <Text>Created at: {repoInfo.created_at}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={_hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    )
  );
};

export default Details;
