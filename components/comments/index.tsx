import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { commentDatabase } from "@/src/data/local/database/config";
import { Comment as CommentModel } from "@/src/data/local/database/models/comment-model";

import { FlatList } from "react-native";
import Comment from "./comment";
import { useUser } from "@/src/stores/user";


type CommentsObservable = {
    comments: CommentModel[],
    postId: string
}

type FlatListCommentsProps = {
    postId: string
}

function FlatListComments({ comments, postId }: CommentsObservable) {

    const userLogged = useUser(state => state.userLogged)

    return (
        <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Comment key={item.id} comment={item} userLogged={userLogged}/>}
        />
    )

}

const enhance = withObservables(['postId'], ({postId}) => ({
    comments: commentDatabase.query(Q.where('post_id', postId), Q.sortBy('created_at', Q.desc))
}))

const EnhancedComments: React.FC<FlatListCommentsProps> = enhance(FlatListComments)

export default EnhancedComments