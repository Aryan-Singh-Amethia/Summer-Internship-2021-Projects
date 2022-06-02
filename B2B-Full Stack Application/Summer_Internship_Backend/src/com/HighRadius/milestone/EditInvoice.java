package com.HighRadius.milestone;

import java.io.IOException;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
* Servlet implementation class EditDataServlet
*/
@WebServlet("/edit")
public class EditInvoice extends HttpServlet {
private static final long serialVersionUID = 1L;
static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
static final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
// Database credentials
static final String USER = "root";
static final String PASS = "root";
public static Connection conn;
Statement stmt;
  public EditInvoice() {
      super();
      // TODO Auto-generated constructor stub
  }
/**
* @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
*/
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//response.getWriter().append("Served at: ").append(request.getContextPath());
  response.setContentType("application/json");
     response.setCharacterEncoding("UTF-8");
//     PrintWriter out = response.getWriter();
  int doc_id;
  float total_open_amount;
  String notes;
  try {
  doc_id = Integer.parseInt(request.getParameter("doc_id"));
  total_open_amount = Float.parseFloat(request.getParameter("total_open_amount"));
  notes = request.getParameter("notes");
  String t = String.valueOf(total_open_amount);
  String di = String.valueOf(doc_id);
  System.out.println(total_open_amount);
  System.out.println(doc_id);
  System.out.println(notes);
     Connection conn = null;
  Statement stmt = null;
       System.out.println("*");
  try {
   Class.forName(JDBC_DRIVER);
      conn=DriverManager.getConnection(DB_URL,USER,PASS);
        stmt = conn.createStatement();
        String sql = "UPDATE invoice_details SET total_open_amount="+t+",notes='"+notes+"' WHERE doc_id="+di;
        stmt.executeUpdate(sql);
        //ResultSet rs = stmt.executeQuery(sql);
        //statement=conn.prepareStatement(query);
        System.out.println("*");     
  }catch(Exception e) {
   System.out.print("ERROR!");
   e.printStackTrace();
  }
  
  }  
  catch(Exception e) {
   System.out.println("ERROR!!!");
  }
 }
 /**
}
/**
* @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
*/
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
// TODO Auto-generated method stub
doGet(request, response);
}
}