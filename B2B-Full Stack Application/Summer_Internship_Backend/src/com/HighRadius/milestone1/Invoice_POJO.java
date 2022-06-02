package com.higradius;
import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
public class Invoice_POJO {
	
	//Defining Variables
	String business_code,customer_number,name_customer,invoice_currency,document_type,area_business,customer_payment_terms;
	Timestamp clear_date,posting_date,document_create_date,due_in_date,baseline_create_date;
	int business_year,posting_id,is_open;
	long doc_id,invoice_id;
	
	//Defining Constructor
	Invoice_POJO(){
		business_code=null;
		customer_number=null;
		name_customer=null;
		invoice_currency=null;
		document_type=null;
		area_business=null;
		customer_payment_terms=null;
		clear_date=null;
		posting_date=null;
		document_create_date=null;
		due_in_date=null;
		baseline_create_date=null;
		business_year=0000;
		posting_id=1;
		is_open=0;
		doc_id=0;
		invoice_id=0;
	}
	
	//Getters and setters
	public String getCustomer_payment_terms() {
		return customer_payment_terms;
	}
	public void setCustomer_payment_terms(String customer_payment_terms) {
		this.customer_payment_terms = customer_payment_terms;
	}
	public long getInvoice_id() {
		return invoice_id;
	}
	public void setInvoice_id(String invoice_id) {
		if(invoice_id.indexOf('.')!=-1) {
			invoice_id=invoice_id.substring(0,invoice_id.length()-2);
		}
		this.invoice_id=Long.parseLong(invoice_id);
	}
	double total_open_amount;
	public String getBusiness_code() {
		return business_code;
	}
	public void setBusiness_code(String business_code) {
		this.business_code = business_code;
	}
	public String getCustomer_number() {
		return customer_number;
	}
	public void setCustomer_number(String customer_number) {
		this.customer_number = customer_number;
	}
	public String getName_customer() {
		return name_customer;
	}
	public void setName_customer(String name_customer) {
		this.name_customer = name_customer;
	}
	public String getInvoice_currency() {
		return invoice_currency;
	}
	public void setInvoice_currency(String invoice_currency) {
		this.invoice_currency = invoice_currency;
	}
	public String getDocument_type() {
		return document_type;
	}
	public void setDocument_type(String document_type) {
		this.document_type = document_type;
	}
	public String getArea_business() {
		return area_business;
	}
	public void setArea_business(String area_business) {
		if(area_business.length()==0)
			this.area_business=null;
		else
		    this.area_business = area_business;
	}
	public Timestamp getClear_date() {
		return clear_date;
	}
	public void setClear_date(String date4) throws ParseException {
		
		   if(date4.length()==0) {
           	this.clear_date=null;
           }
           else {
           Date date=new SimpleDateFormat("dd-MM-yyyy hh:mm").parse(date4);  
           String date0=new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(date);  
           Timestamp clear_date=Timestamp.valueOf(date0);
           this.clear_date=clear_date;
           }
	}
	public Timestamp getPosting_date() {
		return posting_date;
	}
	public void setPosting_date(String date1) throws ParseException {
		 Date date = new SimpleDateFormat("dd-MM-yyyy").parse(date1); 
         String date0 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(date);
         Timestamp posting_date=Timestamp.valueOf(date0);
         this.posting_date=(posting_date);
	}
	public Timestamp getDocument_create_date() {
		return document_create_date;
	}
	public void setDocument_create_date(String date2) throws ParseException {
		 Date date = new SimpleDateFormat("yyyymmdd").parse(date2);
         String date0 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(date);
         Timestamp document_create_date=Timestamp.valueOf(date0);
         this.document_create_date=(document_create_date);
         
	}
	public Timestamp getDue_in_date() {
		return due_in_date;
	}
	public void setDue_in_date(String date3) throws ParseException {
		  Date date = new SimpleDateFormat("yyyymmdd").parse(date3);
          String date0 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(date);
          Timestamp due_in_date=Timestamp.valueOf(date0);
          this.due_in_date=(due_in_date);
	}
	public Timestamp getBaseline_create_date() {
		return baseline_create_date;
	}
	public void setBaseline_create_date(String date5) throws ParseException {
		Date date = new SimpleDateFormat("yyyymmdd").parse(date5);
        String date0 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(date);
        Timestamp baseline_create_date=Timestamp.valueOf(date0);
        this.baseline_create_date=(baseline_create_date);
        
	}
	public int getBusiness_year() {
		return business_year;
	}
	public void setBusiness_year(String business_year) {
		if((business_year).length()>4){
			this.business_year=Integer.parseInt(business_year.substring(0,4));
		}
		else
		   this.business_year = Integer.parseInt(business_year);
	}
	public int getPosting_id() {
		return posting_id;
	}
	public void setPosting_id(String posting_id) {
		if(posting_id.indexOf('.')!=-1) {
			posting_id=posting_id.substring(0,posting_id.length()-2);
		}
		this.posting_id=Integer.parseInt(posting_id);
	}
	public int getIs_open() {
		return is_open;
	}
	public void setIs_open(int is_open) {
		this.is_open = is_open;
	}
	public long getDoc_id() {
		return doc_id;
	}
	public void setDoc_id(String doc_id) {
		if(doc_id.indexOf('.')!=-1) {
			doc_id=doc_id.substring(0,doc_id.length()-2);
		}
		this.doc_id=Long.parseLong(doc_id);
	}
	public double getTotal_open_amount() {
		return total_open_amount;
	}
	public void setTotal_open_amount(double total_open_amount) {
		this.total_open_amount = total_open_amount;
	}
	

}
