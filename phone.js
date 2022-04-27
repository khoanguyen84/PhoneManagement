var products = [
    "Iphone 6s",
    "Iphone 7 plus",
    "Iphone X -1",
    "Iphone 8"
]

const key_enter = 13;
// var position = 0;

function renderProduct(data) {
    let tbProducts = document.querySelector('.table>tbody');
    let htmls = data.map(function (product, index) {
        return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product}</td>
                    <td>
                        <button class="btn" onclick="modify(${index})">Edit</button>
                        <button class="btn" onclick='removeProduct(${index})'>Remove</button>
                    </td>
                </tr>
                `
    })
    tbProducts.innerHTML = htmls.join("");
}

function createProduct() {
    // 1. lấy được tên sản phẩm muốn thêm vào
    // 2. Bổ sung sản phẩm này vào danh sách products
    // 2.1 tên phẩm phải khác null hoặc rõng mới được thêm vào
    // 2.2 ngược lại thì hiển thị thông báo
    // 3. Hiển thị lại dữ liệu
    // 4. xóa input chưa tên sản phẩm và đặt focus
    let productName = document.querySelector("#productName").value;
    if (productName != null && productName.trim() != "") {
        products.push(productName);
        reset();
        renderProduct(products);
    }
    else {
        alert("Product name is required!")
        document.querySelector("#productName").focus();
    }
}

function reset() {
    document.querySelector("#productName").value = "";
}

function pressEnter(e) {
    if (e.keyCode == key_enter) {
        createProduct();
    }
}

function removeProduct(index) {
    let confirmed = window.confirm(`Are sure to want to remove ${products[index]}?`);
    if (confirmed) {
        products.splice(index, 1);
        renderProduct(products);
    }
}

function modify(index) {
    document.querySelector('#modifyProduct').classList.remove('d-none');
    document.querySelector("#new_ProductName").value = products[index];
    // position = index;
    document.querySelector("#btnUpdate").onclick = function () {
        let new_ProductName = document.querySelector("#new_ProductName").value;
        if (new_ProductName != null && new_ProductName.trim() != "") {
            products[index] = new_ProductName;
            renderProduct(products);
            clearForm();
        }
        else {
            alert("Product name is required!")
            document.querySelector("#new_ProductName").focus();
        }
    }
}

function clearForm() {
    document.querySelector('#modifyProduct').classList.add('d-none');
    position = 0;
}

function sort(direction){
    // if(direction == 'asc'){
    //     products.sort();
    // }
    // else{
    //     products.reverse();
    // }
    direction == 'asc' ? products.sort() : products.reverse();
    renderProduct(products);
}

function search(event){
    let keywork = event.target.value;
    let result =  products.filter(function(product, index){
        return product.toLowerCase().indexOf(keywork.toLowerCase()) != -1;
    })
    renderProduct(result);
}

function init() {
    // document.querySelector("#productName").onkeydown = function(e){
    //     if(e.keyCode == key_enter){
    //         createProduct();
    //     }
    // }
    renderProduct(products);
}

init();
