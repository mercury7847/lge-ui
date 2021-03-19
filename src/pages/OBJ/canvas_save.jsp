<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*, java.sql.*" %><%@page import="java.io.File"%><%@page import="java.util.Date"%><%@page import="java.awt.Graphics"%><%@page import="java.awt.Image"%><%@page import="java.awt.image.BufferedImage"%><%@page import="java.awt.Color"%><%@page import="java.text.SimpleDateFormat"%><%@page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%><%@page import="org.apache.commons.fileupload.FileItem"%><%@page import="java.util.List"%><%@page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%><%@page import="javax.imageio.ImageIO"%><%@page import="java.awt.Graphics2D"%><%
	String resultCode = "00";
	String err = "0";

	int maxSize = 10 * 1024 * 1024; // 업로드가능한 최대 크기 10MB
	//String uploadDirectory = "C:/project/workspace/tromm/WebContent/tromm_event/upload"; // 업로드 경로
	String uploadDirectory = "/mnt/efs/webapps/ROOT/nfsimg"; // 업로드 경로

	String jsa_bg0 = "";
	String jsa_bg1 = "";
	String jsa_bg2 = "";
	String jsa_bg3 = "";
	String refrigerator_LT = "";
	String refrigerator_LB = "";
	String refrigerator_RB = "";
	String refrigerator_convertible = "";
	String dish = "";
	String oven = "";
	String water = "";
	String clean = "";
	String refrigerator_T = "";
	String refrigerator_M = "";
	String refrigerator_B = "";
	String wash_T = "";
	String wash_B = "";
	String styler = "";
	String aroot = "";

	//file_path = todayDir; // 파일경로
	File dir = new File(uploadDirectory);
	if (!dir.exists()) {
		dir.mkdirs();
	}

	long currentTime = System.currentTimeMillis(); 
	SimpleDateFormat simDf = new SimpleDateFormat("yyyyMMddHHmmss");
	SimpleDateFormat monthDayDf = new SimpleDateFormat("MMdd"); 
	int randomNumber = (int)(Math.random()*100000); 
	String uniqueFileName = monthDayDf.format(new Date(currentTime)) + "_" + randomNumber + simDf.format(new Date(currentTime)); 
    String save_folder = "2021"+monthDayDf.format(new Date(currentTime));

	if (ServletFileUpload.isMultipartContent(request)) {
		List<FileItem> fileList = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
		
		for (FileItem item : fileList) {
			if (!item.isFormField()) {
				String file_org_name = item.getName();
				if (!file_org_name.equals("")){
					
						String path = "/mnt/efs/webapps/ROOT/nfsimg/"+save_folder; //폴더 경로
						File Folder = new File(path);

						if (!Folder.exists()) {
								Folder.mkdir(); //폴더 생성합니다.  
						}


						item.write(new File(uploadDirectory+ "/" + save_folder + File.separator + "canvas_img_"+uniqueFileName+".jpg"));

						String imgOriginalPath= "/mnt/efs/webapps/ROOT/nfsimg/"+save_folder+"/canvas_img_"+uniqueFileName+".jpg";           // 원본 이미지 파일명
						String imgTargetPath= "/mnt/efs/webapps/ROOT/nfsimg/"+save_folder+"/canvas_img_"+uniqueFileName+"_resize.jpg"; 
						String imgTargetPath2= "/mnt/efs/webapps/ROOT/nfsimg/"+save_folder+"/canvas_img_"+uniqueFileName+"_resize2.jpg";// 새 이미지 파일명
						String imgFormat = "jpg";                             // 새 이미지 포맷. jpg, gif 등
						int newWidth = 768;                                  // 변경 할 넓이
						int newHeigt = 108;      
			            //354,356

						// 원본 이미지 가져오기
						Image image = ImageIO.read(new File(imgOriginalPath));
			  
						int imageWidth = image.getWidth(null);

						if (imageWidth> 8000){
							Image resizeImage = image.getScaledInstance(7680, 1080, Image.SCALE_SMOOTH);
							BufferedImage newImage = new BufferedImage(7680, 1080, BufferedImage.TYPE_INT_RGB);
							Graphics g = newImage.getGraphics();
							g.drawImage(resizeImage, 0, 0, null);
							g.dispose();
							ImageIO.write(newImage, imgFormat, new File(imgOriginalPath));
						}

						Image resizeImage = image.getScaledInstance(newWidth, newHeigt, Image.SCALE_SMOOTH);
						Image resizeImage2 = image.getScaledInstance(354, 50, Image.SCALE_SMOOTH);
			  
						// 새 이미지  저장하기
						BufferedImage newImage = new BufferedImage(newWidth, newHeigt, BufferedImage.TYPE_INT_RGB);
						Graphics g = newImage.getGraphics();
						g.drawImage(resizeImage, 0, 0, null);
						g.dispose();
						//ImageIO.write(newImage, imgFormat, new File(imgTargetPath));

						BufferedImage newImage2 = new BufferedImage(354, 50, BufferedImage.TYPE_INT_RGB);
						Graphics g2 = newImage2.getGraphics();
						g2.drawImage(resizeImage2, 0, 0, null);
						g2.dispose();
						//ImageIO.write(newImage2, imgFormat, new File(imgTargetPath2));


						//BufferedImage image1 = ImageIO.read(new File("/mnt/efs/webapps/ROOT/nfsimg/"+save_folder+"/canvas_img_"+uniqueFileName+"_resize.jpg"));
						BufferedImage image1 = ImageIO.read(new File("/mnt/efs/webapps/ROOT/nfsimg/canvas_bgkt.jpg"));
						BufferedImage image2 = ImageIO.read(new File("/mnt/efs/webapps/ROOT/nfsimg/canvas_bg.jpg"));

						BufferedImage mergedImage = new BufferedImage(768, 400, BufferedImage.TYPE_INT_RGB);
						Graphics2D graphics = (Graphics2D) mergedImage.getGraphics();

						graphics.setBackground(Color.WHITE);
						graphics.drawImage(image2, 0, 0, null);
						graphics.drawImage(newImage, 0, 146, null);
						
						BufferedImage mergedImage2 = new BufferedImage(354, 356, BufferedImage.TYPE_INT_RGB);
						Graphics2D graphics2 = (Graphics2D) mergedImage2.getGraphics();

						graphics2.setBackground(Color.WHITE);
						graphics2.drawImage(image1, 0, 0, null);
						graphics2.drawImage(newImage2, 0, 146, null);

						ImageIO.write(mergedImage, "jpeg", new File("/mnt/efs/webapps/ROOT/nfsimg/"+save_folder+"/canvas_img_"+uniqueFileName+"_thumnail.jpg"));
						ImageIO.write(mergedImage2, "jpeg", new File("/mnt/efs/webapps/ROOT/nfsimg/"+save_folder+"/canvas_img_"+uniqueFileName+"_thumnail2.jpg"));
						// ImageIO.write(mergedImage, "jpg", new File("c:\\mergedImage.jpg"));
						// ImageIO.write(mergedImage, "png", new File("c:\\mergedImage.png"));
                        //File file = new File("/mnt/efs/webapps/ROOT/nfsimg/"+save_folder+"/canvas_img_"+uniqueFileName+"_resize.jpg");
						//file.delete();

				}
			} else {
				String fieldName = item.getFieldName();
				String fieldValue = item.getString("UTF-8");

				if (fieldName.equals("jsa_bg0")) { 
					jsa_bg0 = fieldValue; 
				}
				if (fieldName.equals("jsa_bg1")) { 
					jsa_bg1 = fieldValue; 
				}
				if (fieldName.equals("jsa_bg2")) { 
					jsa_bg2 = fieldValue; 
				}
				if (fieldName.equals("jsa_bg3")) { 
					jsa_bg3 = fieldValue; 
				}
				if (fieldName.equals("refrigerator_LT")) { 
					refrigerator_LT = fieldValue; 
				}
				if (fieldName.equals("refrigerator_LB")) { 
					refrigerator_LB = fieldValue; 
				}
				if (fieldName.equals("refrigerator_RB")) { 
					refrigerator_RB = fieldValue; 
				}
				if (fieldName.equals("refrigerator_convertible")) { 
					refrigerator_convertible = fieldValue; 
				}
				if (fieldName.equals("dish")) { 
					dish = fieldValue; 
				}
				if (fieldName.equals("oven")) { 
					oven = fieldValue; 
				}
				if (fieldName.equals("water")) { 
					water = fieldValue; 
				}
				if (fieldName.equals("refrigerator_T")) { 
					refrigerator_T = fieldValue; 
				}
				if (fieldName.equals("refrigerator_M")) { 
					refrigerator_M = fieldValue; 
				}
				if (fieldName.equals("refrigerator_B")) { 
					refrigerator_B = fieldValue; 
				}
				if (fieldName.equals("wash_T")) { 
					wash_T = fieldValue; 
				}
				if (fieldName.equals("wash_B")) { 
					wash_B = fieldValue; 
				}
				if (fieldName.equals("styler")) { 
					styler = fieldValue; 
				}
				if (fieldName.equals("clean")) { 
					clean = fieldValue; 
				}
				if (fieldName.equals("aroot")) { 
					aroot = fieldValue; 
				}
			}
		}
	}

String desKey = "ajs1010";
String url = "jdbc:mysql://rds.myrobots.co.kr:3306/objet?autoReconnect=true&useUnicode=true&characterEncoding=utf8&user=objet_admin&password=neo1234Qwer";


Connection con = null;
Statement stmt = null;
con = DriverManager.getConnection(url);
con.setAutoCommit(true);
stmt = con.createStatement();
try {
	//proc1 = refrigerator_LT,refrigerator_LB,refrigerator_RB
	//proc2 = refrigerator_T,refrigerator_B
	//proc3 = refrigerator_convertible
	//proc4 = dish
	//proc5 = oven
	//proc6 = water
	//proc7 = wash_T,wash_B
	//proc8 = styler
	/*
    if (refrigerator_LT.equals("") && (!refrigerator_LB.equals("") || !refrigerator_RB.equals(""))){
	    refrigerator_LT = "fn_botanic";
	}
	if (!refrigerator_LT.equals("") && refrigerator_LB.equals("")){
        refrigerator_LB = "fn_sand";
	}
    if (refrigerator_LT.equals("") && refrigerator_LB.equals("") && !refrigerator_RB.equals(""))){
	    refrigerator_LT = "fn_botanic";
		refrigerator_LB = "fn_sand";
	}
    */

    if (refrigerator_LT.equals("fn_botanic")){
        refrigerator_LT = "DB870TT-FBT";
	}else if (refrigerator_LT.equals("fn_sand")){
        refrigerator_LT = "DB870TT-FSD";
	}else if (refrigerator_LT.equals("fn_stone")){
        refrigerator_LT = "DB870TT-FST";
	}else if (refrigerator_LT.equals("st_black")){
        refrigerator_LT = "DB870TT-SMT";
	}else if (refrigerator_LT.equals("st_silver")){
        refrigerator_LT = "DB870TT-SSV";
	}else if (refrigerator_LT.equals("st_green")){
        refrigerator_LT = "DB870TT-SGR";
	}else if (refrigerator_LT.equals("mg_beige")){
        refrigerator_LT = "DB870TT-GBE";
	}else if (refrigerator_LT.equals("mg_pink")){
        refrigerator_LT = "DB870TT-GPK";
	}else if (refrigerator_LT.equals("mg_mint")){
        refrigerator_LT = "DB870TT-GMN";
	}else if (refrigerator_LT.equals("mg_silver")){
        refrigerator_LT = "DB870TT-GSV";
	}else if (refrigerator_LT.equals("nm_gray")){
        refrigerator_LT = "DB870TT-MGY";
	}else if (refrigerator_LT.equals("nm_black")){
        refrigerator_LT = "DB870TT-MBK";
	}else if (refrigerator_LT.equals("nm_white")){
        refrigerator_LT = "DB870TT-MWH";
	}

    if (refrigerator_LB.equals("fn_botanic")){
        refrigerator_LB = "DB870BB-FBT";
	}else if (refrigerator_LB.equals("fn_sand")){
        refrigerator_LB = "DB870BB-FSD";
	}else if (refrigerator_LB.equals("fn_stone")){
        refrigerator_LB = "DB870BB-FST";
	}else if (refrigerator_LB.equals("st_black")){
        refrigerator_LB = "DB870BB-SMT";
	}else if (refrigerator_LB.equals("st_silver")){
        refrigerator_LB = "DB870BB-SSV";
	}else if (refrigerator_LB.equals("st_green")){
        refrigerator_LB = "DB870BB-SGR";
	}else if (refrigerator_LB.equals("mg_beige")){
        refrigerator_LB = "DB870BB-GBE";
	}else if (refrigerator_LB.equals("mg_pink")){
        refrigerator_LB = "DB870BB-GPK";
	}else if (refrigerator_LB.equals("mg_mint")){
        refrigerator_LB = "DB870BB-GMN";
	}else if (refrigerator_LB.equals("mg_silver")){
        refrigerator_LB = "DB870BB-GSV";
	}else if (refrigerator_LB.equals("nm_gray")){
        refrigerator_LB = "DB870BB-MGY";
	}else if (refrigerator_LB.equals("nm_black")){
        refrigerator_LB = "DB870BB-MBK";
	}else if (refrigerator_LB.equals("nm_white")){
        refrigerator_LB = "DB870BB-MWH";
	}

    if (refrigerator_RB.equals("fn_botanic")){
        refrigerator_RB = "DB870CC-FBT";
	}else if (refrigerator_RB.equals("fn_sand")){
        refrigerator_RB = "DB870CC-FSD";
	}else if (refrigerator_RB.equals("fn_stone")){
        refrigerator_RB = "DB870CC-FST";
	}else if (refrigerator_RB.equals("st_black")){
        refrigerator_RB = "DB870CC-SMT";
	}else if (refrigerator_RB.equals("st_silver")){
        refrigerator_RB = "DB870CC-SSV";
	}else if (refrigerator_RB.equals("st_green")){
        refrigerator_RB = "DB870CC-SGR";
	}else if (refrigerator_RB.equals("mg_beige")){
        refrigerator_RB = "DB870CC-GBE";
	}else if (refrigerator_RB.equals("mg_pink")){
        refrigerator_RB = "DB870CC-GPK";
	}else if (refrigerator_RB.equals("mg_mint")){
        refrigerator_RB = "DB870CC-GMN";
	}else if (refrigerator_RB.equals("mg_silver")){
        refrigerator_RB = "DB870CC-GSV";
	}else if (refrigerator_RB.equals("nm_gray")){
        refrigerator_RB = "DB870CC-MGY";
	}else if (refrigerator_RB.equals("nm_black")){
        refrigerator_RB = "DB870CC-MBK";
	}else if (refrigerator_RB.equals("nm_white")){
        refrigerator_RB = "DB870CC-MWH";
	}
    /*
    if (refrigerator_T.equals("") && !refrigerator_B.equals("")){
        refrigerator_T = "fn_stone";
	}
    if (!refrigerator_T.equals("") && refrigerator_B.equals("")){
        refrigerator_B = "fn_sand";
	}
    */

    if (refrigerator_T.equals("fn_botanic")){
        refrigerator_T = "K330TT-FBT";
	}else if (refrigerator_T.equals("fn_sand")){
        refrigerator_T = "K330TT-FSD";
	}else if (refrigerator_T.equals("fn_stone")){
        refrigerator_T = "K330TT-FST";
	}else if (refrigerator_T.equals("st_black")){
        refrigerator_T = "K330TT-SMT";
	}else if (refrigerator_T.equals("st_silver")){
        refrigerator_T = "K330TT-SSV";
	}else if (refrigerator_T.equals("st_green")){
        refrigerator_T = "K330TT-SGR";
	}else if (refrigerator_T.equals("mg_beige")){
        refrigerator_T = "K330TT-GBE";
	}else if (refrigerator_T.equals("mg_pink")){
        refrigerator_T = "K330TT-GPK";
	}else if (refrigerator_T.equals("mg_mint")){
        refrigerator_T = "K330TT-GMN";
	}else if (refrigerator_T.equals("mg_silver")){
        refrigerator_T = "K330TT-GSV";
	}else if (refrigerator_T.equals("nm_gray")){
        refrigerator_T = "K330TT-MGY";
	}else if (refrigerator_T.equals("nm_black")){
        refrigerator_T = "K330TT-MBK";
	}else if (refrigerator_T.equals("nm_white")){
        refrigerator_T = "K330TT-MWH";
	}

    if (refrigerator_M.equals("fn_botanic")){
        refrigerator_M = "K330MM-FBT";
	}else if (refrigerator_M.equals("fn_sand")){
        refrigerator_M = "K330MM-FSD";
	}else if (refrigerator_M.equals("fn_stone")){
        refrigerator_M = "K330MM-FST";
	}else if (refrigerator_M.equals("st_black")){
        refrigerator_M = "K330MM-SMT";
	}else if (refrigerator_M.equals("st_silver")){
        refrigerator_M = "K330MM-SSV";
	}else if (refrigerator_M.equals("st_green")){
        refrigerator_M = "K330MM-SGR";
	}else if (refrigerator_M.equals("mg_beige")){
        refrigerator_M = "K330MM-GBE";
	}else if (refrigerator_M.equals("mg_pink")){
        refrigerator_M = "K330MM-GPK";
	}else if (refrigerator_M.equals("mg_mint")){
        refrigerator_M = "K330MM-GMN";
	}else if (refrigerator_M.equals("mg_silver")){
        refrigerator_M = "K330MM-GSV";
	}else if (refrigerator_M.equals("nm_gray")){
        refrigerator_M = "K330MM-MGY";
	}else if (refrigerator_M.equals("nm_black")){
        refrigerator_M = "K330MM-MBK";
	}else if (refrigerator_M.equals("nm_white")){
        refrigerator_M = "K330MM-MWH";
	}

    if (refrigerator_B.equals("fn_botanic")){
        refrigerator_B = "K330BB-FBT";
	}else if (refrigerator_B.equals("fn_sand")){
        refrigerator_B = "K330BB-FSD";
	}else if (refrigerator_B.equals("fn_stone")){
        refrigerator_B = "K330BB-FST";
	}else if (refrigerator_B.equals("st_black")){
        refrigerator_B = "K330BB-SMT";
	}else if (refrigerator_B.equals("st_silver")){
        refrigerator_B = "K330BB-SSV";
	}else if (refrigerator_B.equals("st_green")){
        refrigerator_B = "K330BB-SGR";
	}else if (refrigerator_B.equals("mg_beige")){
        refrigerator_B = "K330BB-GBE";
	}else if (refrigerator_B.equals("mg_pink")){
        refrigerator_B = "K330BB-GPK";
	}else if (refrigerator_B.equals("mg_mint")){
        refrigerator_B = "K330BB-GMN";
	}else if (refrigerator_B.equals("mg_silver")){
        refrigerator_B = "K330BB-GSV";
	}else if (refrigerator_B.equals("nm_gray")){
        refrigerator_B = "K330BB-MGY";
	}else if (refrigerator_B.equals("nm_black")){
        refrigerator_B = "K330BB-MBK";
	}else if (refrigerator_B.equals("nm_white")){
        refrigerator_B = "K330BB-MWH";
	}

    if (refrigerator_convertible.equals("fn_botanic")){
        refrigerator_convertible = "Y320AA-FBT";
	}else if (refrigerator_convertible.equals("fn_sand")){
        refrigerator_convertible = "Y320AA-FSD";
	}else if (refrigerator_convertible.equals("fn_stone")){
        refrigerator_convertible = "Y320AA-FST";
	}else if (refrigerator_convertible.equals("st_black")){
        refrigerator_convertible = "Y320AA-SMT";
	}else if (refrigerator_convertible.equals("st_silver")){
        refrigerator_convertible = "Y320AA-SSV";
	}else if (refrigerator_convertible.equals("st_green")){
        refrigerator_convertible = "Y320AA-SGR";
	}else if (refrigerator_convertible.equals("mg_beige")){
        refrigerator_convertible = "Y320AA-GBE";
	}else if (refrigerator_convertible.equals("mg_pink")){
        refrigerator_convertible = "Y320AA-GPK";
	}else if (refrigerator_convertible.equals("mg_mint")){
        refrigerator_convertible = "Y320AA-GMN";
	}else if (refrigerator_convertible.equals("mg_silver")){
        refrigerator_convertible = "Y320AA-GSV";
	}else if (refrigerator_convertible.equals("nm_gray")){
        refrigerator_convertible = "Y320AA-MGY";
	}else if (refrigerator_convertible.equals("nm_black")){
        refrigerator_convertible = "Y320AA-MBK";
	}else if (refrigerator_convertible.equals("nm_white")){
        refrigerator_convertible = "Y320AA-MWH";
	}

    if (dish.equals("st_silver")){
        dish = "DUBJ2VA";
	}else if (dish.equals("st_green")){
        dish = "DUBJ2GA";
	}else if (dish.equals("nm_beige")){
        dish = "DUBJ2EA";
	}

    if (oven.equals("st_silver")){
        oven = "ML32SW1";
	}else if (oven.equals("st_green")){
        oven = "ML32GW1";
	}else if (oven.equals("mg_beige")){
        oven = "ML32EW1";
	}

    if (styler.equals("mg_green")){
        styler = "S5GFO";
	}else if (styler.equals("mg_beige")){
        styler = "S5BFO";
	}

    if (water.equals("calm_green")){
        water = "WD503AGB";
	}else if (water.equals("calm_beige")){
        water = "WD503ACB";
	}

    if (clean.equals("calm_green")){
        clean = "AO9571GKT";
	}else if (clean.equals("calm_beige")){
        clean = "AO9571WKT";
	}

    if (!wash_T.equals("") && wash_B.equals("")){
		wash_B = "nm_beige";	     
	}
    if (wash_T.equals("") && !wash_B.equals("")){
		wash_T = "nm_green";	     
	}

	if (wash_T.equals("nm_beige") && wash_B.equals("nm_beige")){
		wash_T = "W16EE";
		wash_B = "W16EE";
	}else if (wash_T.equals("nm_beige") && wash_B.equals("nm_pink")){
		wash_T = "W16PE";
		wash_B = "W16PE";
	}else if (wash_T.equals("nm_beige") && wash_B.equals("nm_green")){
		wash_T = "W16GE";
		wash_B = "W16GE";
	}else if (wash_T.equals("nm_pink") && wash_B.equals("nm_pink")){
		wash_T = "W16PP";
		wash_B = "W16PP";
	}else if (wash_T.equals("nm_pink") && wash_B.equals("nm_beige")){
		wash_T = "W16EP";
		wash_B = "W16EP";
	}else if (wash_T.equals("nm_pink") && wash_B.equals("nm_green")){
		wash_T = "W16GP";
		wash_B = "W16GP";
	}else if (wash_T.equals("nm_green") && wash_B.equals("nm_green")){
		wash_T = "W16GG";
		wash_B = "W16GG";
	}else if (wash_T.equals("nm_green") && wash_B.equals("nm_beige")){
		wash_T = "W16EG";
		wash_B = "W16EG";
	}else if (wash_T.equals("nm_green") && wash_B.equals("nm_pink")){
		wash_T = "W16PG";
		wash_B = "W16PG";
	}

	StringBuffer sql = new StringBuffer();
	sql.append("INSERT INTO lg_objet_simulator");
	sql.append("(location1,location2,location3,location4,proc1_lt,proc1_lb,proc1_rb,proc2_t,proc2_m,proc2_b,proc3_f,proc4_f,proc5_f,proc6_f,proc7_t,proc7_b,proc8_f,proc9_f,event_type,regdate,img,user_root,aroot)");
	sql.append(" VALUES(");
	sql.append("'" + jsa_bg0 + "'");
	sql.append(",'" + jsa_bg1 + "'");
	sql.append(",'" + jsa_bg2 + "'");
	sql.append(",'" + jsa_bg3 + "'");
	sql.append(",'" + refrigerator_LT + "'");
	sql.append(",'" + refrigerator_LB + "'");
	sql.append(",'" + refrigerator_RB + "'");
	//sql.append(",HEX(AES_ENCRYPT('"+store_master_tel+"', 'ajs1010'))");
	sql.append(",'" + refrigerator_T + "'");
	sql.append(",'" + refrigerator_M + "'");
	sql.append(",'" + refrigerator_B + "'");
	sql.append(",'" + refrigerator_convertible + "'");
	sql.append(",'" + dish + "'");
	sql.append(",'" + oven + "'");
	sql.append(",'" + water + "'");
	sql.append(",'" + wash_T + "'");
	sql.append(",'" + wash_B + "'");
	sql.append(",'" + styler + "'");
	sql.append(",'" + clean + "'");
	sql.append(",''");
	sql.append(",now()");
	sql.append(",'" +save_folder+"/"+uniqueFileName + "'");
	sql.append(",'1','"+aroot+"') ");
	//out.println(sql.toString());
	int executeCnt = stmt.executeUpdate(sql.toString());
	
} catch (Exception e) {
	err = "1";
	e.printStackTrace();
	con.rollback();
	//out.println(e);
}  finally {
	if (stmt != null)
		stmt.close();
	if (con != null)
		con.close();
}
%>{"err":"<%=err%>","seq":"<%=uniqueFileName%>"}


