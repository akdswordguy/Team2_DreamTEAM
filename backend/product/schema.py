import strawberry
from product.queries import Query
from product.mutations import ProductMutations, OrderMutations, OrderItemMutations


@strawberry.type
class RootMutations:
    productMutations: ProductMutations = strawberry.field(
        resolver=lambda: ProductMutations()
    )
    orderMutations: OrderMutations = strawberry.field(resolver=lambda: OrderMutations())
    orderItemMutations: OrderItemMutations = strawberry.field(
        resolver=lambda: OrderItemMutations()
    )


schema = strawberry.Schema(query=Query, mutation=RootMutations)