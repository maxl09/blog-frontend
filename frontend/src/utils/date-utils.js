export function timeFormatShort(date) {
    const now = new Date();
    const postDate = new Date(date);
    const diff = now - postDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return years + 'y';
    if (months > 0) return months + 'm';
    if (weeks > 0) return weeks + 'w';
    if (days > 0) return days + 'd';
    if (hours > 0) return hours + 'h';
    if (minutes > 0) return minutes + 'm';
    if (seconds > 0) return seconds + 's';
    return 'Just now';
}

export function timeFormatLong(date) {
    const now = new Date();
    const postDate = new Date(date);
    const diff = now - postDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return (years > 1 ? years + ' years ago' : years + ' year ago');
    if (months > 0) return (months > 1 ? months + ' months ago' : months + ' month ago');
    if (weeks > 0) return (weeks > 1 ? weeks + ' weeks ago' : weeks + ' week ago');
    if (days > 0) return (days > 1 ? days + ' days ago' : days + ' day ago');
    if (hours > 0) return (hours > 1 ? hours + ' hours ago' : hours + ' hour ago')
    if (minutes > 0) return (minutes > 1 ? minutes + ' minutes ago' : minutes + ' minute ago')
    return seconds + 'seconds';
}

