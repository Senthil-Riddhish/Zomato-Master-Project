import joi from "joi";
export const validateRestaurantcity=(restaurantObj)=>{
    const Schema=joi.object({
        city:joi.string().required()
    });
    return Schema.validateAsync(restaurantObj);
};

export const validateRestaurantSearchHistory=(restaurantObj)=>{
    const Schema=joi.object({
        searchString:joi.string().required()
    });
    return Schema.validateAsync(restaurantObj)
}