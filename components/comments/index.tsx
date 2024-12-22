import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { commentDatabase } from "@/src/data/local/database/config";
import { Comment as CommentModel } from "@/src/data/local/database/models/comment-model";

import { FlatList } from "react-native";
import Comment from "./comment";


type CommentsObservable = {
    comments: CommentModel[],
    postId: string
}

type FlatListCommentsProps = {
    postId: string
}

function FlatListComments({ comments, postId }: CommentsObservable) {

    console.log(`comments =>`, comments);
    console.log(`postId =>`, postId);

    return (
        <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Comment comment={item} key={item.id}/>}
        />
    )

}

const enhance = withObservables(['postId'], ({postId}) => ({
    comments: commentDatabase.query(Q.where('post_id', postId), Q.sortBy('created_at', Q.desc))
}))

const EnhancedComments: React.FC<FlatListCommentsProps> = enhance(FlatListComments)

export default EnhancedComments