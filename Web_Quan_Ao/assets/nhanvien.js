var nhanvien = {
    init: function () {
        get_ds_nhanvien();
        $('#btn-add-nhanvien').click(function () {
            $('#ipIdHidden').val(0);
            $('#ipMaNV').val('');
            $('#ipTenNV').val('');
            $('#ipSDT').val('');
            $('#ipNgaySinh').val('');
            $('#ipDiaChi').val('');
            $('#titleNhanVien').text('Thêm mới nhân viên');
            $('#modalThemSuaNhanVien').modal('show');
        });
        $('#btnSave').click(function () {
            if ($('#ipMaNV').val() == '') {
                toastr.warning('Vui lòng nhập mã nhân viên');
                return;
            }
            if ($('#ipTenNV').val() == '') {
                toastr.warning('Vui lòng nhập tên nhân viên');
                return;
            }
            them_sua_nhanvien();
        });
    }
}
function get_ds_nhanvien() {
    let target_selector = '#ds-nhan-vien';
    $(target_selector).html('Đang tải danh sách nhân viên...');
    $.post("api.aspx",
        {
            action: "get_ds_nhanvien"
        },
        function (data) {
            let L = JSON.parse(data);
            if (L.ok) {
                var data_nv = L.nhanviens;
                if (L.nhanviens) {
                    let s = "<table class='vien_den'>";
                    s += "<tr><th>Mã nhân viên</th><th>Tên nhân viên</th><th>Số điện thoại</th><th>Ngày sinh</th><th>Địa chỉ</th><th>Chức năng</th></tr>";
                    for (let item of data_nv) {
                        s += "<tr>";
                        s += "<td>" + item.MaNV + "</td>";
                        s += "<td>" + item.TenNV + "</td>";
                        s += "<td>" + item.SDT + "</td>";
                        s += "<td>" + (item.NgaySinh != null ? moment(item.NgaySinh).format('DD-MM-YYYY') : "") + "</td>";
                        s += "<td>" + item.Diachi + "</td>";
                        s += '<td align=center><button type="button" onclick="get_nhanvien_id(' + item.Id + ')" class="btn btn-sm btn-warning btnSua me-2">Sửa</button>' +
                            '<button type = "button" onclick="xoa_nhanvien(' + item.Id + ')" class="btn btn-sm btn-danger"> Xóa</button ></td > ';
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
function them_sua_nhanvien() {
    var send_data = {
        action: 'them_sua_nhanvien',
        manv: $('#ipMaNV').val(),
        tennv: $('#ipTenNV').val(),
        ngaysinh: $('#ipNgaySinh').val(),
        sdt: $('#ipSDT').val(),
        diachi: $('#ipDiaChi').val(),
        id: $('#ipIdHidden').val()
    }
    $.post("api.aspx",
        send_data,
        function (data) {
            var json = JSON.parse(data);
            if (json.ok) {
                $('#modalThemSuaNhanVien').modal('hide');
                toastr.success('Cập nhật thông tin thành công');
                get_ds_nhanvien();
            } else {
                toastr.warning(json.msg);
            }
        });
}

function get_nhanvien_id(id) {
    $.post("api.aspx",
        {
            action: "get_NhanVien_byId",
            id: id
        },
        function (data) {
            let L = JSON.parse(data);
            if (L.ok) {
                $('#ipIdHidden').val(L.nhanviens.Id);
                $('#ipMaNV').val(L.nhanviens.MaNV);
                $('#ipTenNV').val(L.nhanviens.TenNV);
                if (L.nhanviens.NgaySinh != null && L.nhanviens.NgaySinh != undefined) {
                    $('#ipNgaySinh').val(moment(L.nhanviens.NgaySinh).format('YYYY-MM-DD'));
                }
                $('#ipSDT').val(L.nhanviens.SDT);
                $('#ipDiaChi').val(L.nhanviens.Diachi);
                $('#titleNhanVien').text('Chỉnh sửa nhân viên');
                $('#modalThemSuaNhanVien').modal('show');
            }
        });
}
function xoa_nhanvien(id) {
    $.confirm({
        title: 'Xác nhận!',
        content: 'Bạn có muốn xóa thông tin nhân viên này!',
        buttons: {
            confirm: function () {
                var send_data = {
                    action: 'xoa_nhanvien',
                    id: id,
                }
                $.post("api.aspx",
                    send_data,
                    function (data) {
                        var json = JSON.parse(data);
                        if (json.ok) {
                            toastr.success('Xóa thành công');
                            get_ds_nhanvien();
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
    nhanvien.init();
});