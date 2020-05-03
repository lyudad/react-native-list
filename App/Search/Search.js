import React, { useEffect, useState } from "react";
import { DataTable, TextInput, Text, RadioButton, Subheading } from "react-native-paper";

import {
  View,
  StyleSheet,
  ScrollView
} from "react-native";

import Details from "./Details";

const Calendar = ({ getRepos, repos, getUser, user }) => {
  const [userSearch, setUserSearch] = useState("");
  const [renderRepos, setRenderRepos] = useState(repos);
  const [sortedBy, setSortedBy] = useState("name");
  const [visible, setVisible] = useState(false);
  const [repoInfo, setRepoInfo] = useState(null);
  const [perPage, setPerPge] = useState("5");
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const label = `page ${currentPage} of ${numberOfPages}`;

  const _showDialog = () => setVisible(true);
  const _hideDialog = () => {
    setRepoInfo(null);
    setVisible(false);
  };

  useEffect(() => {
    if (userSearch) {
      getRepos(userSearch, currentPage, perPage);
      getUser(userSearch);
    } else {
      setRenderRepos([]);
    }
  }, [userSearch, currentPage, perPage]);

  useEffect(() => {
    setRenderRepos(repos);
  }, [repos]);

  useEffect(() => {
    if (user) {
      setNumberOfPages(Math.ceil(user.public_repos / parseInt(perPage)));
    }
  }, [user]);

  const sortBY = (a, b) => {
    let comparison = 0;
    if (a[sortedBy] > b[sortedBy]) {
      comparison = 1;
    } else if (a[sortedBy] < b[sortedBy]) {
      comparison = -1;
    }
    return comparison;
  };

  const onRowTap = repo => {
    setRepoInfo(repo);
    _showDialog();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={userSearch}
        onChangeText={e => setUserSearch(e)}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        spellCheck={false}
        textContentType="none"
        style={styles.textInput}
        type="outlined"
        label="github username"
      />

      <ScrollView style={{flex: 1, width: '100%'}}>
        <DataTable style={styles.repos}>
          <DataTable.Header>
            <DataTable.Title
              onPress={() => setSortedBy("id")}
              numberOfLines={3}
            >
              <Text># id</Text>
            </DataTable.Title>
            <DataTable.Title
              onPress={() => setSortedBy("name")}
            >
              <Text>repo name</Text>
            </DataTable.Title>
            <DataTable.Title
              onPress={() => setSortedBy("id")}
              style={{ ...styles.login }}
            >
              <Text>owner</Text>
            </DataTable.Title>
            <DataTable.Title onPress={() => setSortedBy("stargazers_count")}>
              <Text>star</Text>
            </DataTable.Title>
            <DataTable.Title onPress={() => setSortedBy("created_at")}>
              <Text>created</Text>
            </DataTable.Title>
          </DataTable.Header>

          {renderRepos.sort(sortBY).map(repo => (
            <DataTable.Row key={repo.id} onPress={() => onRowTap(repo)} style={styles.tableRow}>
              <DataTable.Cell style={{ ...styles.ids }}>
                {repo.id}
              </DataTable.Cell>
              <DataTable.Cell style={{ ...styles.name }}>
                {repo.name}
              </DataTable.Cell>
              <DataTable.Cell style={{ ...styles.login }}>
                {repo.owner.login}
              </DataTable.Cell>
              <DataTable.Cell>{repo.stargazers_count}</DataTable.Cell>
              <DataTable.Cell>{repo.created_at.split("T")[0]}</DataTable.Cell>
            </DataTable.Row>
          ))}
          <DataTable.Pagination
            page={currentPage}
            numberOfPages={numberOfPages}
            onPageChange={page => {
              setCurrentPage(page);
              console.log(page);
            }}
            label={label}
          />
        </DataTable>
        <Subheading>
          Results per page
        </Subheading>
        <RadioButton.Group
          onValueChange={value => setPerPge(value)}
          value={perPage}
        >
          <View style={styles.radioGroup}>
            <View style={styles.radioOption}>
              <Text>5</Text>
              <RadioButton value="5" />
            </View>
            <View style={styles.radioOption}>
              <Text>10</Text>
              <RadioButton value="10" />
            </View>
            <View style={styles.radioOption}>
              <Text>15</Text>
              <RadioButton value="15" />
            </View>
            <View style={styles.radioOption}>
              <Text>20</Text>
              <RadioButton value="20" />
            </View>
          </View>
        </RadioButton.Group>
      </ScrollView>
      <Details
        repoInfo={repoInfo}
        visible={visible}
        _showDialog={_showDialog}
        _hideDialog={_hideDialog}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "2%",
    paddingBottom: 50,
    borderWidth: 1,
    borderColor: "#555"
  },
  textInput: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
    height: 60
  },
  header: {

    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black"
  },
  repos: {
    paddingBottom: 30,
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "black"
  },

  radioGroup: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-around"
  },
  radioOption: {
    justifyContent: "center",
    alignItems: "center"
  },
  tableRow: {
    flexWrap: 'wrap'
  }
});

export default Calendar;
