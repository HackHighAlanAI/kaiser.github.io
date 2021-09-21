// Use this sample to create your own voice commands
intent("(open | view) (the|) cart", p => {
    
    p.play({command: "open-cart"})
})

intent("(close | stop showing) (the|) cart", p => {
    
    p.play({command: "close-cart"})
})

const itemNameSLot = "$(ITEM_NAME Lenovo Legion 5 Pro|ASUS TUF Gaming F15|ASUS ROG Strix G17|MSI Bravo 15|Dell Alienware  m15| Dell XPS 13 |HP Omen|ASUS ROG Zephyrus)"

const quantityContext = context(() => {
    
    follow("$(QUANTITY NUMBER)", p => {
        
        p.play({command: 'add-item', payload: { quantity: p.QUANTITY.number, name: p.state.name}})
        p.resolve()
    })
    
    fallback("Please state how may items you want in your cart")

})


intent(`Add (the|) ${itemNameSLot} to (the|) cart`, p => {
    
    p.play("How many would like to add?")
    p.then(quantityContext, {state: { name: p.ITEM_NAME.value } })
})

intent(`Remove (the|) ${itemNameSLot} from (the|) cart`, p => {
    
           p.play({command: 'remove-item', payload: { name: p.ITEM_NAME.value}})
    
})

intent("(checkout | purchase the items)", p => {
    
    p.play({command: "purchase-items"})
})


intent('(Hello | Hey | Whatsup| How are you) Alan ,(My name is | you call me | this is) $(NAME)',"Yo how's it going", p => {
    p.play(`Hello ${p.NAME.value}`);
});

intent('(Help me out here| Help)',p => {
    
    p.play("You can order items by telling the item name and tell me how many do you want.You can remove items too from the cart and ask me to checkout for you too")
})