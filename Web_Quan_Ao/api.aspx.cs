using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Web_Quan_Ao
{
    public partial class api : System.Web.UI.Page
    {
        SqlConnection cnStr = new SqlConnection(
        WebConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString);
        private class Data_reply

        {
            public bool ok; //true/false => báo thêm thành công hay ko
            public string msg; //nếu có lỗi thì chi tiết báo lỗi ở đây
        }
        private class Data_ds_SanPham : Data_reply
        {
            public List<Data_SanPham> sanPhams;
        }
        private class SanPham: Data_reply
        {
            public Data_SanPhamById sanPhams;
        }
        private class NhaCC: Data_reply
        {
            public Data_NCC nhaCCs;
        }
        private class KhachHang: Data_reply
        {
            public Data_KhachHang khachHangs;
        }
        private class DonHang: Data_reply
        {
            public Data_DonHang donHangs;
        }
        private class NhanVien : Data_reply
        {
            public Data_NhanVien nhanviens;
        }
        private class Data_ds_NhaCC : Data_reply
        {
            public List<Data_NCC> nCCs;
        }
        private class Data_ds_DonHang: Data_reply
        {
            public List<Data_DonHang> donHangs;
        }
        private class Data_ds_CTDonHang: Data_reply
        {
            public List<Data_CTDonHang> cTDonHangs;
            public decimal TongTienDH;
        }
        private class Data_ds_KhoHang: Data_reply
        {
            public List<Data_KhoHang> _khohangs;
        }
        private class Data_ds_NhanVien : Data_reply
        {
            public List<Data_NhanVien> nhanviens;
        }
        private class Data_SanPham
        {
            public int Id, SoLuong, NccId;
            public string MaSP, TenSp, Size, MauSac, TenNCC;
            public decimal GiaTien;
            public bool LoadRow(DataRow r, ref Exception ex)
            {
                try
                {
                    Id = int.Parse(r["id"].ToString());
                    SoLuong = int.Parse(r["soluong"].ToString());
                    NccId = int.Parse(r["nccid"].ToString());

                    MaSP = r["masp"].ToString();
                    TenSp = r["tensp"].ToString();
                    Size = r["size"].ToString();
                    MauSac = r["mausac"].ToString();

                    TenNCC = r["tenncc"].ToString();
                    GiaTien = decimal.Parse(r["giatien"].ToString());
                }
                catch (Exception e)
                {
                    ex = e;
                    return false;
                }
                return true;
            }
        }
        private class Data_SanPhamById
        {
            public int Id, SoLuong, NccId;
            public string MaSP, TenSp, Size, MauSac;
            public decimal GiaTien;
            public bool LoadRow(DataRow r, ref Exception ex)
            {
                try
                {
                    Id = int.Parse(r["id"].ToString());
                    SoLuong = int.Parse(r["soluong"].ToString());
                    NccId = int.Parse(r["nccid"].ToString());

                    MaSP = r["masp"].ToString();
                    TenSp = r["tensp"].ToString();
                    Size = r["size"].ToString();
                    MauSac = r["mausac"].ToString();
                    GiaTien = decimal.Parse(r["giatien"].ToString());
                }
                catch (Exception e)
                {
                    ex = e;
                    return false;
                }
                return true;
            }
        }
        private class Data_NCC
        {
            public int Id;
            public string TenNCC, MaNCC;
            public bool LoadRow(DataRow r, ref Exception e)
            {
                try
                {
                    Id = int.Parse(r["id"].ToString());
                    MaNCC = r["mancc"].ToString();
                    TenNCC = r["tenncc"].ToString();
                    return true;
                }
                catch (Exception ex)
                {
                    e = ex;
                    return false;
                }
            }
        }
        private class Data_ds_KhachHang : Data_reply
        {
            public List<Data_KhachHang> khachHangs;
        }
        private class Data_KhachHang
        {
            public int Id;
            public string TenKH, SDT, Diachi;
            public DateTime? NgaySinh;
            public bool LoadRow(DataRow r, ref Exception ex)
            {
                try
                {
                    Id = int.Parse(r["id"].ToString());
                    TenKH = r["tenkh"].ToString();
                    SDT = r["sdt"].ToString();
                    Diachi = r["diachi"].ToString();
                    if (!string.IsNullOrEmpty(r["ngaysinh"].ToString()))
                    {
                        NgaySinh = DateTime.Parse(r["ngaysinh"].ToString());
                    }
                    else
                    {
                        NgaySinh = null;
                    }
                }
                catch (Exception e)
                {
                    ex = e;
                    return false;
                }
                return true;
            }
        }
        private class Data_DonHang
        {
            public int Id;
            public string MaDH, TenDH;
            public DateTime? NgayLap;
            public bool LoadRow(DataRow r, ref Exception ex)
            {
                try
                {
                    Id = int.Parse(r["id"].ToString());
                    MaDH = r["madh"].ToString();
                    TenDH = r["tendh"].ToString();
                    if (!string.IsNullOrEmpty(r["ngaylap"].ToString()))
                    {
                        NgayLap = DateTime.Parse(r["ngaylap"].ToString());
                    }
                    else
                    {
                        NgayLap = null;
                    }
                }
                catch (Exception e)
                {
                    ex = e;
                    return false;
                }
                return true;
            }
        }
        private class Data_CTDonHang
        {
            public int Id, DonhangId, SanPhamId, SoLuong;
            public string MaSp, TenSp, TenDH;
            public decimal Giaban, TongTien;
            public bool LoadRow(DataRow r, ref Exception ex)
            {
                try
                {
                    Id = int.Parse(r["id"].ToString());
                    DonhangId = int.Parse(r["donhangid"].ToString());
                    SanPhamId = int.Parse(r["sanphamid"].ToString());
                    MaSp = r["masp"].ToString();
                    TenSp = r["tensp"].ToString();
                    TenDH = r["tendh"].ToString();
                    SoLuong = int.Parse(r["soluong"].ToString());
                    Giaban = decimal.Parse(r["giaban"].ToString());
                    TongTien = decimal.Parse(r["tongtien"].ToString());
                }
                catch (Exception e)
                {
                    ex = e;
                    return false;
                }
                return true;
            }
        }
        private class Data_KhoHang
        {
            public int Id, SanPhamId, SoLuongBan, SoLuongHong, SoLuongSp;
            public string MaSp, TenSp, Size, MauSac;
            public bool LoadRow(DataRow r, ref Exception ex)
            {
                try
                {
                    Id = int.Parse(r["id"].ToString());
                    SanPhamId = int.Parse(r["sanphamid"].ToString());
                    SoLuongBan = int.Parse(r["soluongban"].ToString());
                    SoLuongSp = int.Parse(r["soluongsp"].ToString());
                    SoLuongHong = int.Parse(r["soluonghong"].ToString());
                    MaSp = r["masp"].ToString();
                    TenSp = r["tensp"].ToString();
                    Size = r["size"].ToString();
                    MauSac = r["mausac"].ToString();
                }
                catch (Exception e)
                {
                    ex = e;
                    return false;
                }
                return true;
            }
        }
        private class Data_NhanVien
        {
            public int Id;
            public string MaNV, TenNV, SDT, Diachi;
            public DateTime? NgaySinh;
            public bool LoadRow(DataRow r, ref Exception ex)
            {
                try
                {
                    Id = int.Parse(r["id"].ToString());
                    MaNV = r["manv"].ToString();
                    TenNV = r["tennv"].ToString();
                    SDT = r["sdt"].ToString();
                    Diachi = r["diachi"].ToString();
                    if (!string.IsNullOrEmpty(r["ngaysinh"].ToString()))
                    {
                        NgaySinh = DateTime.Parse(r["ngaysinh"].ToString());
                    }
                    else
                    {
                        NgaySinh = null;
                    }
                }
                catch (Exception e)
                {
                    ex = e;
                    return false;
                }
                return true;
            }
        }
        private void get_ds_san_pham()
        {
            Data_ds_SanPham L = new Data_ds_SanPham();
            L.msg = "";
            try
            {
                string sql = "SP_GetListSanPham";
                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                SqlDataReader dr = cm.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                dr.Close();
                cm.Dispose();
                Exception e = null;
                if (dt.Rows.Count > 0)
                {
                    L.sanPhams = new List<Data_SanPham>();
                    foreach (DataRow r in dt.Rows)
                    {
                        Data_SanPham sp = new Data_SanPham();
                        L.sanPhams.Add(sp);
                        if (!sp.LoadRow(r, ref e))
                        {
                            L.msg += $"Sản phẩm {sp.MaSP} error: {e.Message}\r\n";
                        }
                    }
                    dt.Dispose();
                }
                cn.Close();
                cn.Dispose();
                L.ok = true;
            }
            catch (Exception ex)
            {
                L.ok = false;
                L.msg += ex.Message;
            }
            string json = JsonConvert.SerializeObject(L);
            this.Response.Write(json);
        }
        private void get_sanpham_byId()
        {
            SanPham L = new SanPham();
            L.msg = "";
            try
            {
                string sql = "SP_GetSanPhamById";
                int id = int.Parse(Request["id"]);
                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@Id", SqlDbType.Int).Value = id;
                SqlDataReader dr = cm.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                dr.Close();
                cm.Dispose();
                Exception e = null;
                if (dt.Rows.Count > 0)
                {
                    L.sanPhams = new Data_SanPhamById();
                    Data_SanPhamById sp = new Data_SanPhamById();
                    var r = dt.Rows[0];
                    sp.LoadRow(r, ref e);
                    L.sanPhams = sp;
                    dt.Dispose();
                }
                cn.Close();
                cn.Dispose();
                L.ok = true;
            }
            catch (Exception ex)
            {
                L.ok = false;
                L.msg += ex.Message;
            }
            string json = JsonConvert.SerializeObject(L);
            this.Response.Write(json);
        }
        void them_sanpham()
        {
            Data_reply R = new Data_reply();
            try
            {
                Data_SanPham k = new Data_SanPham();
                k.MaSP = Request["masp"];
                k.TenSp = Request["tensp"];
                k.NccId = int.Parse(Request["ncc"]);
                k.Size = Request["size"];
                k.MauSac = Request["mausac"];
                k.SoLuong = int.Parse(Request["soluong"]);
                k.GiaTien = decimal.Parse(Request["giatien"]);
                k.Id = int.Parse(Request["id"]);
                //gọi sp_ để insert vào

                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                string sql = string.Empty;
                if (k.Id == 0)
                {
                    sql = "SP_InsertSanPham";
                }
                else
                {
                    sql = "SP_UpdateSanPham";
                }
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@MaSP", SqlDbType.NVarChar, 50).Value = k.MaSP;
                cm.Parameters.Add("@TenSP", SqlDbType.NVarChar, 500).Value = k.TenSp;
                cm.Parameters.Add("@Size", SqlDbType.Int).Value = k.Size;
                cm.Parameters.Add("@MauSac", SqlDbType.NVarChar, 50).Value = k.MauSac;
                cm.Parameters.Add("@SoLuong", SqlDbType.Int).Value = k.SoLuong;
                cm.Parameters.Add("@GiaTien", SqlDbType.Decimal).Value = k.GiaTien;
                cm.Parameters.Add("@NccId", SqlDbType.Int).Value = k.NccId;
                if(k.Id > 0)
                {
                    cm.Parameters.Add("@Id", SqlDbType.Int).Value = k.Id;
                }
                int n = cm.ExecuteNonQuery();

                if (n > 0)
                {
                    R.ok = true;
                }
                else
                {
                    R.ok = false;
                    R.msg = "Lỗi gì đó nên ko thêm được";
                }
                cm.Dispose(); //giải phóng tài nguyên thực thi sql
                cn.Close();   //đóng kết nối
                cn.Dispose(); //giải phóng tài nguyên kết nối db
            }
            catch (Exception ex)
            {
                //bẫy được lỗi -> gán vào thuộc tính error
                R.ok = false;
                R.msg = ex.Message;
            }
            //chuyển đối tượng R -> json text
            string json = JsonConvert.SerializeObject(R);
            //gửi json text về trình duyệt
            this.Response.Write(json);
        }
        void xoa_sanpham()
        {
            Data_reply R = new Data_reply();
            SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
            cn.Open();
            string sql = "Sp_XoaSanpham";
            SqlCommand cm = new SqlCommand(sql, cn);
            cm.CommandType = CommandType.StoredProcedure;
            cm.Parameters.Add("@Id", SqlDbType.Int).Value = int.Parse(Request["id"]);
            int n = cm.ExecuteNonQuery();
            if (n > 0)
            {
                R.ok = true;
            }
            else
            {
                R.ok = false;
                R.msg = "Lỗi gì đó nên ko thêm được";
            }
            cm.Dispose(); 
            cn.Close();   
            cn.Dispose();
            string json = JsonConvert.SerializeObject(R);
            this.Response.Write(json);
        }
        private void get_ds_ncc()
        {
            Data_ds_NhaCC L = new Data_ds_NhaCC();
            try
            {
                string sql = "SP_NhaCC";
                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                SqlDataReader dr = cm.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                dr.Close();
                cm.Dispose();
                if (dt.Rows.Count > 0)
                {
                    L.nCCs = new List<Data_NCC>();
                    Exception ex = null;
                    foreach (DataRow r in dt.Rows)
                    {
                        Data_NCC kh = new Data_NCC();
                        kh.LoadRow(r, ref ex);
                        L.nCCs.Add(kh);
                    }
                }
                cn.Close();
                cn.Dispose();
                L.ok = true;
            }
            catch (Exception ex)
            {
                L.ok = false;
                L.msg = ex.Message;
            }
            string json = JsonConvert.SerializeObject(L);
            this.Response.Write(json);
        }
        void them_sua_nhacc()
        {
            Data_reply R = new Data_reply();
            try
            {
                Data_NCC k = new Data_NCC();
                k.MaNCC = Request["mancc"];
                k.TenNCC = Request["tenncc"];
                k.Id = int.Parse(Request["id"]);
                //gọi sp_ để insert vào

                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                string sql = "Insert_Update_NhaCC";
            
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@MaNCC", SqlDbType.NVarChar, 50).Value = k.MaNCC;
                cm.Parameters.Add("@TenNCC", SqlDbType.NVarChar, 500).Value = k.TenNCC;
                cm.Parameters.Add("@Id", SqlDbType.Int).Value = k.Id;
                int n = cm.ExecuteNonQuery();

                if (n > 0)
                {
                    R.ok = true;
                }
                else
                {
                    R.ok = false;
                    R.msg = "Lỗi gì đó nên ko thêm được";
                }
                cm.Dispose(); //giải phóng tài nguyên thực thi sql
                cn.Close();   //đóng kết nối
                cn.Dispose(); //giải phóng tài nguyên kết nối db
            }
            catch (Exception ex)
            {
                //bẫy được lỗi -> gán vào thuộc tính error
                R.ok = false;
                R.msg = ex.Message;
            }
            //chuyển đối tượng R -> json text
            string json = JsonConvert.SerializeObject(R);
            //gửi json text về trình duyệt
            this.Response.Write(json);
        }
        private void get_nhacc_byId()
        {
            NhaCC L = new NhaCC();
            L.msg = "";
            try
            {
                string sql = "SP_GetNhaCCById";
                int id = int.Parse(Request["id"]);
                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@Id", SqlDbType.Int).Value = id;
                SqlDataReader dr = cm.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                dr.Close();
                cm.Dispose();
                Exception e = null;
                if (dt.Rows.Count > 0)
                {
                    L.nhaCCs = new Data_NCC();
                    Data_NCC ncc = new Data_NCC();
                    var r = dt.Rows[0];
                    ncc.LoadRow(r, ref e);
                    L.nhaCCs = ncc;
                    dt.Dispose();
                }
                cn.Close();
                cn.Dispose();
                L.ok = true;
            }
            catch (Exception ex)
            {
                L.ok = false;
                L.msg += ex.Message;
            }
            string json = JsonConvert.SerializeObject(L);
            this.Response.Write(json);
        }
        void xoa_nhacc()
        {
            Data_reply R = new Data_reply();
            SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
            cn.Open();
            string sql = "SP_XoaNhaCC";
            SqlCommand cm = new SqlCommand(sql, cn);
            cm.CommandType = CommandType.StoredProcedure;
            cm.Parameters.Add("@Id", SqlDbType.Int).Value = int.Parse(Request["id"]);
            int n = cm.ExecuteNonQuery();
            if (n > 0)
            {
                R.ok = true;
            }
            else
            {
                R.ok = false;
                R.msg = "Lỗi gì đó nên ko thêm được";
            }
            cm.Dispose();
            cn.Close();
            cn.Dispose();
            string json = JsonConvert.SerializeObject(R);
            this.Response.Write(json);
        }

        private void get_ds_khachhang()
        {
            Data_ds_KhachHang L = new Data_ds_KhachHang();
            try
            {
                string sql = "Sp_GetListKhachHang";
                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                SqlDataReader dr = cm.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                dr.Close();
                cm.Dispose();
                if (dt.Rows.Count > 0)
                {
                    L.khachHangs = new List<Data_KhachHang>();
                    Exception ex = null;
                    foreach (DataRow r in dt.Rows)
                    {
                        Data_KhachHang kh = new Data_KhachHang();
                        kh.LoadRow(r, ref ex);
                        L.khachHangs.Add(kh);
                    }
                }
                cn.Close();
                cn.Dispose();
                L.ok = true;
            }
            catch (Exception ex)
            {
                L.ok = false;
                L.msg = ex.Message;
            }
            string json = JsonConvert.SerializeObject(L);
            this.Response.Write(json);
        }
        void them_sua_kh()
        {
            Data_reply R = new Data_reply();
            try
            {
                Data_KhachHang k = new Data_KhachHang();
                k.TenKH = Request["tenkh"];
                k.SDT = Request["sdt"];
                if (!string.IsNullOrEmpty(Request["ngaysinh"]))
                {
                    k.NgaySinh = DateTime.Parse(Request["ngaysinh"]);
                }
                else
                {
                    k.NgaySinh = null;
                }
                k.Diachi = Request["diachi"];
                k.Id = int.Parse(Request["id"]);
                //gọi sp_ để insert vào

                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                string sql = "Sp_InsertUpdateKhachHang";

                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@Id", SqlDbType.Int).Value = k.Id;
                cm.Parameters.Add("@TenKH", SqlDbType.NVarChar, 2000).Value = k.TenKH;
                cm.Parameters.Add("@SDT", SqlDbType.NVarChar, 50).Value = k.SDT;
                cm.Parameters.Add("@NgaySinh", SqlDbType.DateTime).Value = k.NgaySinh;
                cm.Parameters.Add("@DiaChi", SqlDbType.NVarChar, 2000).Value = k.Diachi;
                int n = cm.ExecuteNonQuery();

                if (n > 0)
                {
                    R.ok = true;
                }
                else
                {
                    R.ok = false;
                    R.msg = "Lỗi gì đó nên ko thêm được";
                }
                cm.Dispose(); //giải phóng tài nguyên thực thi sql
                cn.Close();   //đóng kết nối
                cn.Dispose(); //giải phóng tài nguyên kết nối db
            }
            catch (Exception ex)
            {
                //bẫy được lỗi -> gán vào thuộc tính error
                R.ok = false;
                R.msg = ex.Message;
            }
            //chuyển đối tượng R -> json text
            string json = JsonConvert.SerializeObject(R);
            //gửi json text về trình duyệt
            this.Response.Write(json);
        }
        private void get_khachHang_byId()
        {
            KhachHang L = new KhachHang();
            L.msg = "";
            try
            {
                string sql = "SP_GetKhachHangById";
                int id = int.Parse(Request["id"]);
                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@Id", SqlDbType.Int).Value = id;
                SqlDataReader dr = cm.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                dr.Close();
                cm.Dispose();
                Exception e = null;
                if (dt.Rows.Count > 0)
                {
                    L.khachHangs = new Data_KhachHang();
                    Data_KhachHang kh = new Data_KhachHang();
                    var r = dt.Rows[0];
                    kh.LoadRow(r, ref e);
                    L.khachHangs = kh;
                    dt.Dispose();
                }
                cn.Close();
                cn.Dispose();
                L.ok = true;
            }
            catch (Exception ex)
            {
                L.ok = false;
                L.msg += ex.Message;
            }
            string json = JsonConvert.SerializeObject(L);
            this.Response.Write(json);
        }
        void xoa_khachhang()
        {
            Data_reply R = new Data_reply();
            SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
            cn.Open();
            string sql = "SP_XoaKhachHang";
            SqlCommand cm = new SqlCommand(sql, cn);
            cm.CommandType = CommandType.StoredProcedure;
            cm.Parameters.Add("@Id", SqlDbType.Int).Value = int.Parse(Request["id"]);
            int n = cm.ExecuteNonQuery();
            if (n > 0)
            {
                R.ok = true;
            }
            else
            {
                R.ok = false;
                R.msg = "Lỗi gì đó nên ko thêm được";
            }
            cm.Dispose();
            cn.Close();
            cn.Dispose();
            string json = JsonConvert.SerializeObject(R);
            this.Response.Write(json);
        }

        private void get_ds_donhang()
        {
            Data_ds_DonHang L = new Data_ds_DonHang();
            L.msg = "";
            try
            {
                string sql = "Sp_GetListDonHang";
                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                SqlDataReader dr = cm.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                dr.Close();
                cm.Dispose();
                Exception e = null;
                if (dt.Rows.Count > 0)
                {
                    L.donHangs = new List<Data_DonHang>();
                    foreach (DataRow r in dt.Rows)
                    {
                        Data_DonHang sp = new Data_DonHang();
                        L.donHangs.Add(sp);
                        if (!sp.LoadRow(r, ref e))
                        {
                            L.msg += $"Đơn hàng {sp.MaDH} error: {e.Message}\r\n";
                        }
                    }
                    dt.Dispose();
                }
                cn.Close();
                cn.Dispose();
                L.ok = true;
            }
            catch (Exception ex)
            {
                L.ok = false;
                L.msg += ex.Message;
            }
            string json = JsonConvert.SerializeObject(L);
            this.Response.Write(json);
        }
        void them_donhang()
        {
            Data_reply R = new Data_reply();
            try
            {
                Data_DonHang k = new Data_DonHang();
                k.TenDH = Request["tendh"];
                if (!string.IsNullOrEmpty(Request["id"].ToString()))
                {
                    k.Id = int.Parse(Request["id"]);
                }
                else
                {
                    k.Id = 0;
                }
                k.MaDH = DateTime.Now.ToString("yymmddhhmmss");
                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                string sql = "Sp_InsertDonHang";

                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@Id", SqlDbType.Int).Value = k.Id;
                cm.Parameters.Add("@TenDH", SqlDbType.NVarChar, 50).Value = k.TenDH;
                cm.Parameters.Add("@MaDH", SqlDbType.NVarChar, 500).Value = k.MaDH;
                int n = cm.ExecuteNonQuery();

                if (n > 0)
                {
                    R.ok = true;
                }
                else
                {
                    R.ok = false;
                    R.msg = "Lỗi gì đó nên ko thêm được";
                }
                cm.Dispose(); //giải phóng tài nguyên thực thi sql
                cn.Close();   //đóng kết nối
                cn.Dispose(); //giải phóng tài nguyên kết nối db
            }
            catch (Exception ex)
            {
                //bẫy được lỗi -> gán vào thuộc tính error
                R.ok = false;
                R.msg = ex.Message;
            }
            //chuyển đối tượng R -> json text
            string json = JsonConvert.SerializeObject(R);
            //gửi json text về trình duyệt
            this.Response.Write(json);
        }
        private void get_Donhang_byId()
        {
            DonHang L = new DonHang();
            L.msg = "";
            try
            {
                string sql = "Sp_GetDonHangId";
                int id = int.Parse(Request["id"]);
                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@Id", SqlDbType.Int).Value = id;
                SqlDataReader dr = cm.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                dr.Close();
                cm.Dispose();
                Exception e = null;
                if (dt.Rows.Count > 0)
                {
                    L.donHangs = new Data_DonHang();
                    Data_DonHang dh = new Data_DonHang();
                    var r = dt.Rows[0];
                    dh.LoadRow(r, ref e);
                    L.donHangs = dh;
                    dt.Dispose();
                }
                cn.Close();
                cn.Dispose();
                L.ok = true;
            }
            catch (Exception ex)
            {
                L.ok = false;
                L.msg += ex.Message;
            }
            string json = JsonConvert.SerializeObject(L);
            this.Response.Write(json);
        }
        void xoa_donhang()
        {
            Data_reply R = new Data_reply();
            SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
            cn.Open();
            string sql = "SP_XoaDonHang";
            SqlCommand cm = new SqlCommand(sql, cn);
            cm.CommandType = CommandType.StoredProcedure;
            cm.Parameters.Add("@Id", SqlDbType.Int).Value = int.Parse(Request["id"]);
            int n = cm.ExecuteNonQuery();
            if (n > 0)
            {
                R.ok = true;
            }
            else
            {
                R.ok = false;
                R.msg = "Lỗi gì đó nên ko thêm được";
            }
            cm.Dispose();
            cn.Close();
            cn.Dispose();
            string json = JsonConvert.SerializeObject(R);
            this.Response.Write(json);
        }
        private void get_ds_ctdonhang()
        {
            Data_ds_CTDonHang L = new Data_ds_CTDonHang();
            L.msg = "";
            try
            {
                string sql = "Sp_GetListCTDonHang";
                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@Id", SqlDbType.Int).Value = int.Parse(Request["id"]);
                SqlDataReader dr = cm.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                dr.Close();
                cm.Dispose();
                Exception e = null;
                decimal tongtienhd = 0;
                if (dt.Rows.Count > 0)
                {
                    L.cTDonHangs = new List<Data_CTDonHang>();
                    foreach (DataRow r in dt.Rows)
                    {
                        Data_CTDonHang sp = new Data_CTDonHang();
                        L.cTDonHangs.Add(sp);
                        if (!sp.LoadRow(r, ref e))
                        {
                            L.msg += $"Đơn hàng {sp.DonhangId} error: {e.Message}\r\n";
                        }
                        
                    }
                    tongtienhd = L.cTDonHangs.Sum(x => x.TongTien);
                    L.TongTienDH = tongtienhd;
                    dt.Dispose();
                }
                cn.Close();
                cn.Dispose();
                L.ok = true;
            }
            catch (Exception ex)
            {
                L.ok = false;
                L.msg += ex.Message;
            }
            string json = JsonConvert.SerializeObject(L);
            this.Response.Write(json);
        }
        void them_cthoadon()
        {
            Data_reply R = new Data_reply();
            try
            {
                Data_CTDonHang k = new Data_CTDonHang();
                k.DonhangId = int.Parse(Request["donhangid"].ToString());
                k.SanPhamId = int.Parse(Request["sanphamid"].ToString());
                k.SoLuong = int.Parse(Request["soluongban"].ToString());
                k.Giaban =  decimal.Parse(Request["giaban"].ToString());
                //k.Id = int.Parse(Request["id"]);
                //gọi sp_ để insert vào

                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                string sql = "Sp_InserCTDonHang";
              
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@DonHangId", SqlDbType.Int).Value = k.DonhangId;
                cm.Parameters.Add("@SanPhamId", SqlDbType.Int).Value = k.SanPhamId;
                cm.Parameters.Add("@SoLuong", SqlDbType.Int).Value = k.SoLuong;
                cm.Parameters.Add("@GiaBan", SqlDbType.Decimal).Value = k.Giaban;
                int n = cm.ExecuteNonQuery();
                if (n > 0)
                {
                    R.ok = true;
                }
                else
                {
                    R.ok = false;
                    R.msg = "Lỗi gì đó nên ko thêm được";
                }
                cm.Dispose(); //giải phóng tài nguyên thực thi sql
                cn.Close();   //đóng kết nối
                cn.Dispose(); //giải phóng tài nguyên kết nối db
            }
            catch (Exception ex)
            {
                //bẫy được lỗi -> gán vào thuộc tính error
                R.ok = false;
                R.msg = ex.Message;
            }
            //chuyển đối tượng R -> json text
            string json = JsonConvert.SerializeObject(R);
            //gửi json text về trình duyệt
            this.Response.Write(json);
        }

        private void get_ds_khohang()
        {
            Data_ds_KhoHang L = new Data_ds_KhoHang();
            L.msg = "";
            try
            {
                string sql = "Sp_GetListKhoHang";
                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                SqlDataReader dr = cm.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                dr.Close();
                cm.Dispose();
                Exception e = null;
                if (dt.Rows.Count > 0)
                {
                    L._khohangs = new List<Data_KhoHang>();
                    foreach (DataRow r in dt.Rows)
                    {
                        Data_KhoHang kh = new Data_KhoHang();
                        L._khohangs.Add(kh);
                        if (!kh.LoadRow(r, ref e))
                        {
                            L.msg += $"Kho hàng {kh.Id} error: {e.Message}\r\n";
                        }
                    }
                    dt.Dispose();
                }
                cn.Close();
                cn.Dispose();
                L.ok = true;
            }
            catch (Exception ex)
            {
                L.ok = false;
                L.msg += ex.Message;
            }
            string json = JsonConvert.SerializeObject(L);
            this.Response.Write(json);
        }
        void nhap_khohang()
        {
            Data_reply R = new Data_reply();
            try
            {
                Data_KhoHang k = new Data_KhoHang();
                k.SanPhamId = int.Parse(Request["sanphamid"].ToString());
                k.SoLuongSp = int.Parse(Request["soluong"].ToString());

                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                string sql = "Sp_InsertKhoHang";

                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@SanPhamId", SqlDbType.Int).Value = k.SanPhamId;
                cm.Parameters.Add("@SoLuong", SqlDbType.Int).Value = k.SoLuongSp;
                int n = cm.ExecuteNonQuery();
                if (n > 0)
                {
                    R.ok = true;
                }
                else
                {
                    R.ok = false;
                    R.msg = "Lỗi gì đó nên ko thêm được";
                }
                cm.Dispose(); //giải phóng tài nguyên thực thi sql
                cn.Close();   //đóng kết nối
                cn.Dispose(); //giải phóng tài nguyên kết nối db
            }
            catch (Exception ex)
            {
                //bẫy được lỗi -> gán vào thuộc tính error
                R.ok = false;
                R.msg = ex.Message;
            }
            //chuyển đối tượng R -> json text
            string json = JsonConvert.SerializeObject(R);
            //gửi json text về trình duyệt
            this.Response.Write(json);
        }
        void Huy_SanPham_khohang()
        {
            Data_reply R = new Data_reply();
            try
            {
                Data_KhoHang k = new Data_KhoHang();
                k.SanPhamId = int.Parse(Request["sanphamid"].ToString());
                k.SoLuongHong = int.Parse(Request["soluong"].ToString());

                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                string sql = "SP_HuySanPham";

                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@SanPhamId", SqlDbType.Int).Value = k.SanPhamId;
                cm.Parameters.Add("@SoLuongHuy", SqlDbType.Int).Value = k.SoLuongHong;
                int n = cm.ExecuteNonQuery();
                if (n > 0)
                {
                    R.ok = true;
                }
                else
                {
                    R.ok = false;
                    R.msg = "Lỗi gì đó nên ko thêm được";
                }
                cm.Dispose(); //giải phóng tài nguyên thực thi sql
                cn.Close();   //đóng kết nối
                cn.Dispose(); //giải phóng tài nguyên kết nối db
            }
            catch (Exception ex)
            {
                //bẫy được lỗi -> gán vào thuộc tính error
                R.ok = false;
                R.msg = ex.Message;
            }
            //chuyển đối tượng R -> json text
            string json = JsonConvert.SerializeObject(R);
            //gửi json text về trình duyệt
            this.Response.Write(json);
        }
        void xoa_khohang()
        {
            Data_reply R = new Data_reply();
            try
            {
                Data_KhoHang k = new Data_KhoHang();
                k.Id = int.Parse(Request["id"].ToString());

                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                string sql = "Sp_XoaKhoHang";

                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@Id", SqlDbType.Int).Value = k.Id;
                int n = cm.ExecuteNonQuery();
                if (n > 0)
                {
                    R.ok = true;
                }
                else
                {
                    R.ok = false;
                    R.msg = "Lỗi gì đó nên ko thêm được";
                }
                cm.Dispose(); //giải phóng tài nguyên thực thi sql
                cn.Close();   //đóng kết nối
                cn.Dispose(); //giải phóng tài nguyên kết nối db
            }
            catch (Exception ex)
            {
                //bẫy được lỗi -> gán vào thuộc tính error
                R.ok = false;
                R.msg = ex.Message;
            }
            //chuyển đối tượng R -> json text
            string json = JsonConvert.SerializeObject(R);
            //gửi json text về trình duyệt
            this.Response.Write(json);
        }

        private void get_ds_nhanvien()
        {
            Data_ds_NhanVien L = new Data_ds_NhanVien();
            L.msg = "";
            try
            {
                string sql = "SP_GetListNhanVien";
                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                SqlDataReader dr = cm.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                dr.Close();
                cm.Dispose();
                Exception e = null;
                if (dt.Rows.Count > 0)
                {
                    L.nhanviens = new List<Data_NhanVien>();
                    foreach (DataRow r in dt.Rows)
                    {
                        Data_NhanVien nv = new Data_NhanVien();
                        L.nhanviens.Add(nv);
                        if (!nv.LoadRow(r, ref e))
                        {
                            L.msg += $"Kho hàng {nv.MaNV} error: {e.Message}\r\n";
                        }
                    }
                    dt.Dispose();
                }
                cn.Close();
                cn.Dispose();
                L.ok = true;
            }
            catch (Exception ex)
            {
                L.ok = false;
                L.msg += ex.Message;
            }
            string json = JsonConvert.SerializeObject(L);
            this.Response.Write(json);
        }
        void them_sua_nhanvien()
        {
            Data_reply R = new Data_reply();
            try
            {
                Data_NhanVien k = new Data_NhanVien();
                k.MaNV = Request["manv"];
                k.TenNV = Request["tennv"];
                k.SDT = Request["sdt"];
                if (!string.IsNullOrEmpty(Request["ngaysinh"]))
                {
                    k.NgaySinh = DateTime.Parse(Request["ngaysinh"]);
                }
                else
                {
                    k.NgaySinh = null;
                }
                k.Diachi = Request["diachi"];
                k.Id = int.Parse(Request["id"]);
                //gọi sp_ để insert vào

                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                string sql = "Sp_InsertNhanVien";

                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@Id", SqlDbType.Int).Value = k.Id;
                cm.Parameters.Add("@MaNV", SqlDbType.NVarChar, 50).Value = k.MaNV;
                cm.Parameters.Add("@TenNV", SqlDbType.NVarChar, 2000).Value = k.TenNV;
                cm.Parameters.Add("@SDT", SqlDbType.NVarChar, 50).Value = k.SDT;
                cm.Parameters.Add("@NgaySinh", SqlDbType.DateTime).Value = k.NgaySinh;
                cm.Parameters.Add("@DiaChi", SqlDbType.NVarChar, 2000).Value = k.Diachi;
                int n = cm.ExecuteNonQuery();

                if (n > 0)
                {
                    R.ok = true;
                }
                else
                {
                    R.ok = false;
                    R.msg = "Lỗi gì đó nên ko thêm được";
                }
                cm.Dispose(); //giải phóng tài nguyên thực thi sql
                cn.Close();   //đóng kết nối
                cn.Dispose(); //giải phóng tài nguyên kết nối db
            }
            catch (Exception ex)
            {
                //bẫy được lỗi -> gán vào thuộc tính error
                R.ok = false;
                R.msg = ex.Message;
            }
            //chuyển đối tượng R -> json text
            string json = JsonConvert.SerializeObject(R);
            //gửi json text về trình duyệt
            this.Response.Write(json);
        }
        private void get_NhanVien_byId()
        {
            NhanVien L = new NhanVien();
            L.msg = "";
            try
            {
                string sql = "Sp_GetNhanVienById";
                int id = int.Parse(Request["id"]);
                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@Id", SqlDbType.Int).Value = id;
                SqlDataReader dr = cm.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                dr.Close();
                cm.Dispose();
                Exception e = null;
                if (dt.Rows.Count > 0)
                {
                    L.nhanviens = new Data_NhanVien();
                    Data_NhanVien dh = new Data_NhanVien();
                    var r = dt.Rows[0];
                    dh.LoadRow(r, ref e);
                    L.nhanviens = dh;
                    dt.Dispose();
                }
                cn.Close();
                cn.Dispose();
                L.ok = true;
            }
            catch (Exception ex)
            {
                L.ok = false;
                L.msg += ex.Message;
            }
            string json = JsonConvert.SerializeObject(L);
            this.Response.Write(json);
        }
        void xoa_nhanvien()
        {
            Data_reply R = new Data_reply();
            try
            {
                int Id = int.Parse(Request["id"].ToString());

                SqlConnection cn = new SqlConnection(cnStr.ConnectionString);
                cn.Open();
                string sql = "Sp_XoaNhanVien";

                SqlCommand cm = new SqlCommand(sql, cn);
                cm.CommandType = CommandType.StoredProcedure;
                cm.Parameters.Add("@Id", SqlDbType.Int).Value = Id;
                int n = cm.ExecuteNonQuery();
                if (n > 0)
                {
                    R.ok = true;
                }
                else
                {
                    R.ok = false;
                    R.msg = "Lỗi gì đó nên ko thêm được";
                }
                cm.Dispose(); //giải phóng tài nguyên thực thi sql
                cn.Close();   //đóng kết nối
                cn.Dispose(); //giải phóng tài nguyên kết nối db
            }
            catch (Exception ex)
            {
                //bẫy được lỗi -> gán vào thuộc tính error
                R.ok = false;
                R.msg = ex.Message;
            }
            //chuyển đối tượng R -> json text
            string json = JsonConvert.SerializeObject(R);
            //gửi json text về trình duyệt
            this.Response.Write(json);
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];
            switch (action)
            {
                case "get_ds_san_pham":
                    get_ds_san_pham();
                    break;
                case "get_ds_ncc":
                    get_ds_ncc();
                    break;
                case "them_sanpham":
                    them_sanpham();
                    break;
                case "get_sanpham_byId":
                    get_sanpham_byId();
                    break;
                case "xoa_sanpham":
                    xoa_sanpham();
                    break;
                case "them_sua_nhacc":
                    them_sua_nhacc();
                    break;
                case "get_nhacc_byId":
                    get_nhacc_byId();
                    break;
                case "xoa_nhacc":
                    xoa_nhacc();
                    break;
                case "get_ds_khachhang":
                    get_ds_khachhang();
                    break;
                case "them_sua_kh":
                    them_sua_kh();
                    break;
                case "get_khachHang_byId":
                    get_khachHang_byId();
                    break;
                case "xoa_khachhang":
                    xoa_khachhang();
                    break;
                case "get_ds_donhang":
                    get_ds_donhang();
                    break;
                case "them_donhang":
                    them_donhang();
                    break;
                case "get_Donhang_byId":
                    get_Donhang_byId();
                    break;
                case "xoa_donhang":
                    xoa_donhang();
                    break;
                case "get_ds_ctdonhang":
                    get_ds_ctdonhang();
                    break;
                case "them_cthoadon":
                    them_cthoadon();
                    break;
                case "get_ds_khohang":
                    get_ds_khohang();
                    break;
                case "nhap_khohang":
                    nhap_khohang();
                    break;
                case "Huy_SanPham_khohang":
                    Huy_SanPham_khohang();
                    break;
                case "xoa_khohang":
                    xoa_khohang();
                    break;
                case "get_ds_nhanvien":
                    get_ds_nhanvien();
                    break;
                case "them_sua_nhanvien":
                    them_sua_nhanvien();
                    break;
                case "get_NhanVien_byId":
                    get_NhanVien_byId();
                    break;
                case "xoa_nhanvien":
                    xoa_nhanvien();
                    break;
            }
        }
    }
}