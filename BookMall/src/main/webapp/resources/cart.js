window.addEventListener("load", () => {
    document.querySelectorAll(".cart").forEach(item => {
        item.addEventListener("click", e => {
            const target = e.target.closest("tr");
            const bookid = target.dataset.bookid;

            fetch(`/cart/add/${bookid}`, {
                method: "GET", 
            })
            .then(resp => resp.text())
            .then(resault => {
                if(resault == "OK")
                    alert("장바구니에 담기 성공");
            });
        });
    });

    document.querySelectorAll(".cart_update").forEach(item => {
        item.addEventListener("click", e => {
            const tr = e.target.closest("tr");
            const input = tr.querySelector("input");

            fetch(`/cart/update/${tr.dataset.bookid}/${input.value}`)
            .then(resp => resp.text())
            .then(result => {
                if(result == "OK"){
                    alert("변경 되었습니다");
                }
            });
            // alert(`update ${tr.dataset.bookid}, ${input.value}`);
        });
    });

    document.querySelectorAll(".cart_delete").forEach(item => {
        item.addEventListener("click", e => {
            const tr = e.target.closest("tr");

            fetch("/cart/delete/" + tr.dataset.bookid)
            .then(resp => resp.text())
            .then(result => {
                if(result == "OK")
                    tr.remove();
            });

        });
    });

    document.querySelector("#check_all").addEventListener("change", e => {
        document.querySelectorAll(".check_item").forEach(item => {
            item.checked = e.target.checked;
        });

    });

});