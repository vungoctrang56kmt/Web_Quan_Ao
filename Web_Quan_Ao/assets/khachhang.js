var khachHang = {
    init: function () {
        get_ds_khachhang();
        $('#btn-add-khachhang').click(function () {
            $('#ipIdHidden').val(0);
            $('#ipTenKH').val('');
            $('#ipNgaySinh').val('');
            $('#ipSDT').val('');
            $('#ipDiaChi').val('');
            $('#titleKhachHang').text("Thêm khách hàng");
            $('#modalThemSuaKhachHang').modal('show');
        });
        $('#btnSave').click(function () {
            them_sua_khachhang();
        });
    }
}
function get_ds_khachhang() {
    let target_selector = '#ds-khach-hang';
    $(target_selector).html('Đang tải danh sách khách hàng...');
    $.post("api.aspx",
        {
            action: "get_ds_khachhang"
        },
        function (data) {
            let L = JSON.parse(data);
            if (L.ok) {
                var data_kh = L.khachHangs;
                if (L.khachHangs) {
                    let s = "<table class='vien_den'>";
                    s += "<tr><th>Tên khách hàng</th><th>Số điện thoại</th><th>Ngày sinh</th><th>Địa chỉ</th><th>Chức năng</th></tr>";
                    for (let item of data_kh) {
                        s += "<tr>";
                        s += "<td>" + item.TenKH + "</td>";
                        s += "<td>" + item.SDT + "</td>";
                        s += "<td>" + (item.NgaySinh != null ? moment(item.NgaySinh).format('DD-MM-YYYY') : "") + "</td>";
                        s += "<td>" + (item.Diachi != undefined ? item.Diachi : "") + "</td>";
                        s += '<td align=center><button type="button" onclick="get_khachhang_id(' + item.Id + ')" class="btn btn-sm btn-warning btnSua me-2">Sửa</button>' +
                            '<button type = "button" onclick="xoa_kh(' + item.Id + ')" class="btn btn-sm btn-danger"> Xóa</button ></td > ';
                        s += "</tr>";
                    }
                    s += "</table>";
                    $(target_selector).html(s);
                } else {
                    $(target_selector).html('Không có dữ liệu');
                }
            }
        });
}
function them_sua_khachhang() {
    var send_data = {
        action: 'them_sua_kh',
        id: $('#ipIdHidden').val(),
        tenkh: $('#ipTenKH').val(),
        sdt: $('#ipSDT').val(),
        ngaysinh: $('#ipNgaySinh').val(),
        diachi: $('#ipDiaChi').val(),
    }
    $.post("api.aspx",
        send_data,
        function (data) {
            var json = JSON.parse(data);
            if (json.ok) {
                $('#modalThemSuaKhachHang').modal('hide');
                toastr.success('Cập nhật thông tin thành công');
                get_ds_khachhang();
            } else {
                toastr.warning(json.msg);
            }
        });
}
function get_khachhang_id(id) {
    $.post("api.aspx",
        {
            action: "get_khachHang_byId",
            id: id
        },
        function (data) {
            let L = JSON.parse(data);
            if (L.ok) {
                $('#ipIdHidden').val(L.khachHangs.Id);
                $('#ipTenKH').val(L.khachHangs.TenKH);
                if (L.khachHangs.NgaySinh != null && L.khachHangs.NgaySinh != undefined) {
                    $('#ipNgaySinh').val(moment(L.khachHangs.NgaySinh).format('YYYY-MM-DD'));

                }
                $('#ipSDT').val(L.khachHangs.SDT);
                $('#ipDiaChi').val(L.khachHangs.Diachi);
                $('#titleKhachHang').text("Chỉnh sửa khách hàng");
                $('#modalThemSuaKhachHang').modal('show');
            }
        });
}
function xoa_kh(id) {
    $.confirm({
        title: 'Xác nhận!',
        content: 'Bạn có muốn xóa thông tin khách hàng này!',
        buttons: {
            confirm: function () {
                var send_data = {
                    action: 'xoa_khachhang',
                    id: id,
                }
                $.post("api.aspx",
                    send_data,
                    function (data) {
                        var json = JSON.parse(data);
                        if (json.ok) {
                            toastr.success('Xóa thành công');
                            get_ds_khachhang();
                        } else {
                            toastr.warning(json.msg);
                        }
                    });
            },
            cancel: function () {

            },
        }
    });
}
$(document).ready(function () {
    khachHang.init();
});