import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

const { user } = useAuth();

const getPostsQuery = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        console.log("Data", data)
        return data;
    } catch (error) {
        console.error("Error:", err.message)
        console.error('Something went wrong')
    }
}

const deletePostMutation = async (postId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ postId })
        });
        const data = await res.json();
        console.log("Deleted Post", data);
        if (!res.ok) {
            toast.error('Cannot delete this post')
        } else {
            toast('Post deleted successfully!');
        }
        return data;
    } catch (error) {
        console.error("Error:", error.message)
        console.error('Something went wrong')
    }
}

const createLikeMutation = async (postId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/like`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ postId })
        });
        const data = await res.json();
        console.log("Liked Post", data);
        if (!res.ok) {
            toast.error("Error liking the post")
        }
        return data;
    } catch (error) {
        console.error("Error:", error.message)
        console.error('Something went wrong')
    }
}

const createSavedMutation = async (postId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/save`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ postId })
        });
        const data = await res.json();
        console.log("Saved Post", data);
        if (!res.ok) {
            toast.error("Error saving the post")
        }
        return data;
    } catch (error) {
        console.error("Error:", error.message)
        console.error('Something went wrong')
    }
}

const getUserProfileQuery = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/${user.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error:", err.message)
        console.error('Something went wrong')
    }
}

const createCommentMutation = async (text, postId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments/create`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ text, postId })
        });
        const data = await res.json();
        console.log("Comment Created", data);
        if (!res.ok) {
            toast.error("Error creating comment")
        }
        return data;
    } catch (error) {
        console.error("Error:", error.message)
        console.error('Something went wrong')
    }
}

const deleteCommentMutation = async (postId, commentId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ postId, commentId })
        });
        const data = await res.json();
        console.log("Comment deleted", data);
        if (!res.ok) {
            toast.error('Cannot delete this comment')
        } else {
            toast('Comment deleted successfully!');
        }
        return data;
        return data;
    } catch (error) {
        console.error("Error:", error.message)
        console.error('Something went wrong')
    }
}

const updateProfilePicMutation = async (image, userId) => {
    try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        if (image) formData.append('image', image);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/profilePic`, {
            method: "POST",
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        const data = await res.json();
        if (!res.ok) {
            toast.error('Cannot update this image')
            console.log('data', data)
        } else {
            window.location.reload();
            // toast('Profile picture updated successfully!');
        }
    } catch (error) {
        console.error("Error updating profile picture:", error.message)
    }
}

const createFollowMutation = async (userId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/follow`, {
            method: "PUT",
            headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            // body: JSON.stringify({ currentUserId })
        });
        const data = await res.json();
        console.log("Followed user", data);
        if (!res.ok) {
            toast.error("Error follow the user")
        }
        return data;
    } catch (error) {
        console.error("Error:", error.message)
        console.error('Something went wrong')
    }
}

export { getPostsQuery, deletePostMutation, createLikeMutation, createSavedMutation, getUserProfileQuery, createCommentMutation, deleteCommentMutation, updateProfilePicMutation, createFollowMutation };