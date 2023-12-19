window.addEventListener("load", () => {
    const calc_saleprice = () => {
        const itemprice_nodes = document.querySelectorAll(".itemprice");

        if(itemprice_nodes.length > 1) {
            const itemprice_array = Array.prototype.slice.call(itemprice_nodes);

            const saleprice = itemprice_array.reduce( (prev, curr) => prev + parseInt(curr.dataset.itemprice), 0);
            document.getElementById("saleprice").textContent = saleprice + " 원";
        }
    };
    document.querySelectorAll(".cart").forEach(item => {
        item.addEventListener("click", e => {
            const target = e.target.closest("tr");
            const bookid = target.dataset.bookid;

            fetch(`/cart/add/${bookid}`, {
                method: "GET",
            })
            .then(resp => resp.text())
            .then(result => {
                if(result == "OK")
                    alert("장바구니에 담기 성공");
            });
        });
    });

    document.querySelectorAll(".cart_update").forEach(item => {
        item.addEventListener("click", e => {
            const tr = e.target.closest("tr");
            const input = tr.querySelector("input[name='amount']");

            fetch(`/cart/update/${tr.dataset.bookid}/${input.value}`)
            .then(resp => resp.text())
            .then(result => {
                if(result == "OK") {
                    alert("변경 되었습니다");

                    // 변경 아이콘 및 데이터셋 업데이트
                    const icon = tr.querySelector("i");

                    input.dataset.value = input.value;
                    icon.classList.add("hide");

                    // 주문금액 업데이트
                    const price = tr.querySelector(".price").dataset.price;
                    const itemprice = input.value * price;

                    tr.querySelector(".itemprice").dataset.itemprice = itemprice;
                    tr.querySelector(".itemprice").textContent = itemprice + "원";
                }
            });            
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

    document.getElementById("check_delete").addEventListener("click", e => {
        const list = [];
        
        document.querySelectorAll(".check_item:checked").forEach(item => {
            const bookid = item.closest("tr").dataset.bookid;

            list.push( parseInt(bookid) );
        });

        if(list.length < 1) {
            alert("삭제를 원하시는 상품을 먼저 선택 해 주세요")
            return;
        }

        fetch("/cart/delete_check", {
            method: "POST",
            body: JSON.stringify(list),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(resp => resp.text())
        .then(result => {
            if(result == "OK") {
                document.querySelectorAll(".check_item:checked").forEach(item => {
                    item.closest("tr").remove();
                });
            }
        });
    });

    document.getElementById("update_all").addEventListener("click", e => {
        const list = [];

        document.querySelectorAll("input[name='amount']").forEach(item => {
            const tr = item.closest("tr");

            list.push({
                bookid: parseInt(tr.dataset.bookid),
                amount: parseInt(item.value),
            });
        });

        if(list.length < 1) {
            alert("변경할 내용이 없습니다")
            return;
        }

        fetch("/cart/update_all", {
            method: "POST",
            body: JSON.stringify(list),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.text())
        .then(result => {
            if(result == "OK") {
                list.forEach(item => {
                    const tr = document.querySelector(`tr[data-bookid='${item.bookid}']`);
                    const input = tr.querySelector("input[name='amount']");
                    const icon = tr.querySelector("i");

                    input.dataset.value = input.value;
                    icon.classList.add("hide");
                });
                alert("변경 되었습니다");
            }
        });
    });

    document.querySelectorAll("input[name='amount']").forEach(item => {
        item.addEventListener("change", e => {
            const tr = e.target.closest("tr");
            const icon = tr.querySelector("i");

            if(e.target.dataset.value != e.target.value)
                icon.classList.remove("hide");
            else
                icon.classList.add("hide");
        });

    });
});