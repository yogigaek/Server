const { Ability, AbilityBuilder } = require('@casl/ability')

const policies = {
	guest(user, {can}) {
		can('read', 'Product')
	},
	user(user, {can}) {
		can('view', 'Order')
		can('create', 'Order')
		can('read', 'Order', {user_id: user._id})
		can('update', 'Order', {user_id: user._id})
		can('read', 'Cart', {user_id: user._id})
		can('update', 'Cart', {user_id: user._id})
		can('view', 'shippingAddress')
		can('create', 'shippingAddress', {user_id: user._id})
		can('update', 'shippingAddress', {user_id: user._id})
		can('delete', 'shippingAddress', {user_id: user._id})
		can('read', 'Invoice', {user_id: user._id})
	},
	admin(user, {can}) {
		can('manage', 'all')
	}
}

const policyFor = user => {
	let builder = new AbilityBuilder()
	if(user && typeof policies[user.role] === 'function') {
		policies[user.role](user, builder)
	} else {
		policies['guest'](user, builder)
	}

	return new Ability(builder.rules)
}

module.exports = policyFor