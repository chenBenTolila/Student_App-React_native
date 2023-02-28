import { FC, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from "react-native";
import React from "react";
import PostModel, { Post } from "../model/PostModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

const ListItem: FC<{
  name: String;
  description: String;
  image: String;
  userImage: String;
  postId: String;
  onDelete: any;
  onEdit: any;
}> = ({ name, description, image, userImage, postId, onDelete, onEdit }) => {
  const onDeletePress = async () => {
    try {
      console.log("in delete post");
      const res = await PostModel.deletePost(postId);
      console.log("deleted");
      onDelete();
    } catch (err) {
      console.log("fail in delete");
    }
  };

  const onEditPress = async () => {
    try {
      onEdit(postId);
    } catch (err) {
      console.log("fail in edit");
    }
  };

  return (
    <TouchableHighlight underlayColor={"gainsboro"}>
      <View style={styles.list}>
        <View style={styles.listRow}>
          {userImage == "" && (
            <Image
              style={styles.userImage}
              source={require("../assets/avatar.png")}
            />
          )}
          {userImage != "" && (
            <Image
              style={styles.userImage}
              source={{ uri: userImage.toString() }}
            />
          )}

          <Text style={styles.userName}>{name}</Text>
          <TouchableOpacity
            style={{ left: 90, marginTop: 5 }}
            onPress={onDeletePress}
          >
            <AntDesign name={"delete"} size={30} color={"gray"}></AntDesign>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ left: 95, margin: 5 }}
            onPress={onEditPress}
          >
            <AntDesign name={"edit"} size={30} color={"gray"}></AntDesign>
          </TouchableOpacity>
        </View>
        <View style={styles.listRowTextContainer}>
          {image == "url" && (
            <Image
              style={styles.postImage}
              source={require("../assets/avatar.png")}
            />
          )}
          {image != "url" && (
            <Image
              style={styles.postImage}
              source={{ uri: image.toString() }}
            />
          )}
          <Text style={styles.postContext}>{description}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const MyPostsList: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const [posts, setPosts] = useState<Array<Post>>();

  const onEdit = async (postId: String) => {
    navigation.navigate("EditPost", { postId: postId });
  };

  const fetchMyPosts = async () => {
    let posts: Post[] = [];
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        console.log("failed fetching my posts "); // TODO
        return;
      }
      posts = await PostModel.getAllUserPosts(userId);
    } catch (err) {
      console.log("fail fetching my posts " + err);
    }
    setPosts(posts);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await fetchMyPosts();
    });
    return unsubscribe;
  }, []);

  return (
    <FlatList
      style={styles.flatlist}
      data={posts}
      keyExtractor={(post) => post.postId.toString()}
      renderItem={({ item }) => (
        <ListItem
          name={item.userEmail}
          description={item.message}
          image={item.image}
          userImage={item.userImage}
          postId={item.postId}
          onDelete={fetchMyPosts}
          onEdit={onEdit}
        />
      )}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  list: {
    margin: 4,
    flex: 1,
    elevation: 1,
    borderRadius: 2,
  },
  listRow: {
    flexDirection: "row",
  },
  userImage: {
    margin: 10,
    resizeMode: "contain",
    height: 50,
    width: 50,
    borderRadius: 30,
  },
  postImage: {
    height: 130,
    width: 130,
    alignSelf: "center",
  },
  listRowTextContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  userName: {
    fontSize: 25,
    marginTop: 10,
  },
  postContext: {
    fontSize: 20,
    margin: 4,
  },
  flatlist: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  picker: {
    left: 10,
  },
});

export default MyPostsList;
