import ItemName from "./ItemName.vue"

ItemName.install = (vue) => {
  vue.component(ItemName.name, ItemName)
}

export default ItemName
