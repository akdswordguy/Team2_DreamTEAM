import strawberry
from product.queries import Query
from product.mutations import ProductMutations

schema = strawberry.Schema(query=Query, mutation=ProductMutations)
