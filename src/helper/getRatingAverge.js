export default function getRatingAverage(restaurant) {
    let totalRating = 0;
    let averageRating = 0
    restaurant?.forEach((rest) => {
        const ratings = rest.ratings;

        if (ratings?.length > 0) {
            // Calculate the total rating value
            totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
            // Calculate the average rating
            averageRating = totalRating / ratings.length;
        }

    })
    return parseInt(averageRating);
}