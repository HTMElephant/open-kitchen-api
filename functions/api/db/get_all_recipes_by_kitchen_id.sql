SELECT r.*
FROM recipes r 
JOIN kitchen_recipes kr on kr.recipe_id = r.id
WHERE kr.kitchen_id = ${id};