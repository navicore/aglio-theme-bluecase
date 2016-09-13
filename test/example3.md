FORMAT: 1A

# Data Structures API
Following [Advanced Attributes](09.%20Advanced%20Attributes.md), this example
demonstrates defining arbitrary data structure to be reused by various
attribute descriptions.

Since a portion of the `Coupon` data structure is shared between the `Coupon`
definition itself and the `Create a Coupon` action, it was separated into a
`Couponer` data structure in the `Data Structures` API Blueprint Section.
Doing so enables us to reuse it as a base-type of other attribute definitions.

## API Blueprint
+ [Previous: Advanced Attributes](09.%20Advanced%20Attributes.md)
+ [This: Raw API Blueprint](https://raw.github.com/apiaryio/api-blueprint/master/examples/10.%20Data%20Structures.md)
+ [Next: Resource Model](11.%20Resource%20Model.md)

# Group Coupons

## Coupon [/coupons/{id}]
A coupon contains information about a percent-off or amount-off discount you
might want to apply to a customer.

+ Parameters
    + id (string)

        The ID of the desired coupon.

+ Attributes (Couponer)
    + id: 250FF (string, required)
    + created: 1415203908 (number) - Time stamp

### Retrieve a Coupon [GET]
Retrieves the coupon with the given ID.

+ Response 200 (application/json)
    + Attributes (Coupon)

## Coupons [/coupons{?limit}]

+ Attributes (array[Coupon])

### List all Coupons [GET]
Returns a list of your coupons.

+ Parameters
    + limit (number, optional)

        A limit on the number of objects to be returned. Limit can range
        between 1 and 100 items.

        + Default: `10`

+ Response 200 (application/json)
    + Attributes (Coupons)

### Create a Coupon [POST]
Creates a new Coupon.

+ Attributes (Couponer)

+ Request (application/json)

+ Response 200 (application/json)
    + Attributes (Coupon)

# Data Structures

## Rule (object)
+ code: 11 (number)

## RuleHolder (object)
+ code (Rule)

## Couponer (object)
+ percent_off: 25 (number)

    A positive integer between 1 and 100 that represents the discount the
    coupon will apply.

+ redeem_by (number) - Date after which the coupon can no longer be redeemed

## DiscountSchema (array)
+ (RuleHolder)

## Txner (object)
+ coupon (Couponer)

    a coupon used with sale

+ amt (number) - dough

    how much did we get?

+ program (DiscountSchema)

    more of more
