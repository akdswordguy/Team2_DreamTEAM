import strawberry
from product.queries import Query
from product.mutations import ProductMutations, OrderMutations, OrderItemMutations


@strawberry.type
class RootMutations:
    product_mutations: ProductMutations = strawberry.field(resolver=ProductMutations)
    order_mutations: OrderMutations = strawberry.field(resolver=OrderMutations)
    order_item_mutations: OrderItemMutations = strawberry.field(
        resolver=OrderItemMutations
    )


schema = strawberry.Schema(query=Query, mutation=RootMutations)