package com.HighRadius.milestone;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.ParseException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@WebServlet("/add")
public class AddInvoice extends HttpServlet{
	 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
		static final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
		static final String USER = "root";
		static final String PASS = "root";
	
	public void doGet(HttpServletRequest  req, HttpServletResponse res) {
		
		Invoice_POJO obj=new Invoice_POJO();
		obj.setName_customer(req.getParameter("customer_name"));
		System.out.println(obj.getName_customer()); //1
		obj.setInvoice_id(req.getParameter("invoice_id"));
		System.out.println(obj.getInvoice_id());//2
		obj.setCustomer_number(req.getParameter("customer_number"));
		System.out.println(obj.getCustomer_number());//3
		
		obj.setTotal_open_amount(Double.parseDouble(req.getParameter("invoice_amount")));
		
		System.out.println(obj.getTotal_open_amount());
		obj.setDoc_id(req.getParameter("invoice_id"));
		try {	
			obj.setDue_in_date(req.getParameter("due_in_date"));
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		String notes=req.getParameter("notes");
		
		
		String query;
		query="INSERT INTO invoice_details(business_code, cust_number, name_customer, doc_id, posting_id, business_year, invoice_currency,document_type, area_business, total_open_amount, cust_payment_terms,invoice_id,isOpen, baseline_create_date, posting_date,document_create_date, due_in_date,clear_date,notes) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  		
  		 Connection conn = null;
  		 PreparedStatement statement=null;
  		 
  		try { 
				Class.forName("com.mysql.jdbc.Driver");
				//STEP 3: Open a connection
				conn = DriverManager.getConnection(DB_URL,USER,PASS);
				conn.setAutoCommit(false);
				statement = conn.prepareStatement(query);
                statement.setString(1, obj.getBusiness_code());
                statement.setString(2, obj.getCustomer_number());
                statement.setString(3, obj.getName_customer());
                statement.setLong(4, obj.getDoc_id());
                statement.setInt(5, obj.getPosting_id());
                statement.setInt(6, obj.getBusiness_year());
                statement.setString(7, obj.getInvoice_currency());
                statement.setString(8, obj.getDocument_type());
                statement.setString(9, obj.getArea_business());
                statement.setDouble(10,obj.getTotal_open_amount());
                statement.setString(11,obj.getCustomer_payment_terms());
                statement.setLong(12, obj.getInvoice_id());
                statement.setInt(13, obj.getIs_open());
                statement.setTimestamp(14, obj.getBaseline_create_date());
                statement.setTimestamp(15, obj.getPosting_date());
                statement.setTimestamp(16, obj.getDocument_create_date());
                statement.setTimestamp(17, obj.getDue_in_date());
                statement.setTimestamp(18, obj.getClear_date());
                statement.setString(19,notes);
				statement.addBatch();
				statement.executeBatch();

				
				 res.getWriter().println("Invoice Added");
				 
				   conn.commit();
				   statement.close();
				   conn.close();
  		}catch (IOException ex) {
            System.err.println(ex);
        } catch (SQLException ex) {
            ex.printStackTrace();
 
            try {
                conn.rollback();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
          		
	
	
	

     }

}
