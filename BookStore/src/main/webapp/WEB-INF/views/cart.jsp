<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<jsp:include page="header.jsp"></jsp:include>
<script src="/resources/js/cart.js"></script>
<style type="text/css"> 
.hide {
	display : none;
}
</style>
</head>
<body>
	<div class="container">
		<nav>
			<jsp:include page="nav.jsp"></jsp:include>
		</nav>
		
		<div>
			<h3>장바구니</h3>
		</div>
		
		<div>
			<table class="table table-sm table-striped">
				<thead class="table-dark">
					<tr>
						<th><input type="checkbox" class="form-check-input" id="check_all"></th>
						<th>도서번호</th>
						<th>도서명</th>
						<th>수량</th>
						<th>단가</th>
						<th>주문금액</th>
						<th>관리</th>
					</tr>
				</thead>
				
				<tbody>
					<c:if test="${sessionScope.cart == null || cart.size() < 1}">
						<tr>
							<td colspan="7">등록 된 도서가 없습니다</td>
						</tr>
					</c:if>
					
					<c:set var="saleprice" value="0"></c:set>
					
					<c:forEach var="item" items="${cart}">
						<c:set var="itemprice" value="${books.get(item.key).price * item.value}"></c:set>
						<c:set var="saleprice" value="${saleprice + itemprice}"></c:set>
						<tr data-bookid="${item.key}">
							<td><input type="checkbox" class="form-check-input check_item"></td>
							<td>${item.key}</td>
							<td>${books.get(item.key).bookname}</td>
							<td><input type="number" value="${item.value}" name="amount" data-value="${item.value}"> <i class="bi bi-check-square hide"></i></td>
							<td class="price" data-price="${books.get(item.key).price}">${books.get(item.key).price}</td>
							<td class="itemprice" data-item-price="${itemprice}">${itemprice}</td>
							<td><button class="btn btn-sm btn-warning cart_update">변경</button> <button class="btn btn-sm btn-danger cart_delete">삭제</button></td>
						</tr>
					</c:forEach>
				</tbody>
				
				<tfoot>
					<tr>
						<td colspan="5">주문금액 (합계):</td>
						<td colspan="2" id="saleprice">${saleprice} 원</td>
					</tr>
				</tfoot>
				
			</table>
		</div>
		
		<div>
			<a href="/orders/order" class="btn btn-sm btn-primary">주문</a>
			
			<button class="btn btn-sm btn-danger" id="check_delete">선택 삭제</button>
			<button class="btn btn-sm btn-warning" id="update_all">적용</button>
			
			<a href="/" class="btn btn-sm btn-secondary">처음으로</a>
		</div>
	
	</div>

</body>
</html>