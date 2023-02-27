import { FC, useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
  FlatList,
  TouchableHighlight,
} from "react-native";

import PostModel, { Post } from "../model/PostModel";

const ListItem: FC<{
  // postId: String;
  userImage: String;
  userId: String;
  text: String;
  postImage: String;
  //onPostSelected: (postId: String) => void;
}> = ({ userId, userImage, text, postImage }) => {
  // const onClick = () => {
  //   console.log("int post: post was selected " + postId);
  //   onPostSelected(postId);
  // };

  console.log("image: " + postImage);
  return (
    <TouchableHighlight underlayColor={"gainsboro"}>
      <View style={styles.listRow}>
        {userImage == "" && (
          <Image
            style={styles.listRowImage}
            source={require("../assets/avatar.png")}
          />
        )}
        {userImage != "" && (
          <Image
            style={styles.listRowImage}
            source={{ uri: userImage.toString() }}
          />
        )}
        <Text style={styles.listRowName}>{userId}</Text>

        {postImage == "" && (
          <Image
            style={styles.listRowImage}
            source={require("../assets/avatar.png")}
          />
        )}
        {postImage != "" && (
          <Image
            style={styles.listRowImage}
            source={{ uri: postImage.toString() }}
          />
        )}
        <Text style={styles.listRowName}>{userId}</Text>

        {/* <View style={styles.listRowTextContainer}>
          <Text style={styles.listRowName}>{name}</Text>
          <Text style={styles.listRowId}>{id}</Text>
        </View> */}
      </View>
    </TouchableHighlight>
  );
};

const PostsList: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const onPostSelected = (id: String) => {
    console.log("in the list: row was selected " + id);
    //navigation.navigate("StudentDetails", { studentId: id });
  };

  const [posts, setPosts] = useState<Array<Post>>();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      console.log("focus");
      let posts: Post[] = [];
      try {
        posts = await PostModel.getAllPosts();
        console.log("fetching students complete");
      } catch (err) {
        console.log("fail fetching students " + err);
      }
      console.log("fetching finish");
      setPosts(posts);
    });
    return unsubscribe;
  });

  return (
    <FlatList
      style={styles.flatlist}
      data={posts}
      keyExtractor={(post) => post.postId.toString()}
      renderItem={({ item }) => (
        <ListItem
          userId={item.userId}
          text={item.text}
          postImage={item.image}
          userImage={item.userImage}
        />
      )}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "grey",
  },
  flatlist: {
    flex: 1,
  },
  listRow: {
    margin: 4,
    flexDirection: "row",
    height: 150,
    elevation: 1,
    borderRadius: 2,
  },
  listRowImage: {
    margin: 10,
    resizeMode: "contain",
    height: 130,
    width: 130,
  },
  listRowTextContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "space-around",
  },
  listRowName: {
    fontSize: 30,
  },
  listRowId: {
    fontSize: 25,
  },
});

export default PostsList;
