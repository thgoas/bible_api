const resetTemplate = (token, user) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Hora do devocional</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin: 0; padding: 0; padding: 20px 0 30px 0">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; ">
    <tr>
      <td align="center" bgcolor="#EEEEEE" style="padding: 40px 0 30px 0;">
        <img src="/public/hora_do_devocional.svg" alt="Hora do Devocional" width="300" height="230" style="display: block;" />
       </td>
    </tr>
    <tr>
      <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;">
              <p style="text-align: center;"><b >Olá ${user}</b></p>
            </td>
           </tr>
           <tr>
            <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
              <p style="text-align: center;">Foi solicitado a recuperação de senha.</p> 
              <p style="text-align: center;">Para efetuar a troca de senha, clique no botão abaixo:</p>
              
            </td>
           </tr>
           <tr>
             <td align='center' style="margin-bottom: 4px; " height="60" >
               <table>
                 <tbody>
  
                   <td align='center' bgcolor="green" height='40' width="150" style="border-radius: 5px; font-family: Arial, sans-serif; font-size: 16px; ">
                     <a style="text-decoration: none; color: white; " href="https://horadodevocional.com.br/forgot_password/${token}">Alterar Senha</a>
                   </td>
                 </tbody>
               </table>

             </td>
           </tr>
           <tr>
            <td align='center' style="margin-bottom: 4px; " height="60" >
              <table>
                <tbody>
 
                  <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                    <p style="text-align: center;">Atenciosamente Hora do Devocional.</p> 
                    
                    
                  </td>
                </tbody>
              </table>

            </td>
          </tr>
          
           </tr>
		   <tr>
			<td bgcolor="#EEEEEE" style="padding: 30px 30px 30px 30px;">
			 <table border="0" cellpadding="0" cellspacing="0" width="100%">
			   <tr>
				 <td style="color: #666666; font-family: Arial, sans-serif; font-size: 14px;">
				   &reg; Hora do Devocional 2022<br/>
				   <!-- <a href="#" style="color: #666666;"><font color="#666666">
				   Remova sua inscrição</font></a> dessa e-mail marketing, instantaneamente -->
				  </td>
				<td align="right">
				 <table border="0" cellpadding="0" cellspacing="0">
				  <tr>
				   <td>
					<a href="http://www.twitter.com/">
					 <img src="images/tw.gif" alt="Twitter" width="38" height="38" style="display: block;" border="0" />
					</a>
				   </td>
				   <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
				   <td>
					<a href="http://www.twitter.com/">
					 <img src="images/fb.gif" alt="Facebook" width="38" height="38" style="display: block;" border="0" />
					</a>
				   </td>
				  </tr>
				 </table>
				</td>
			   </tr>
			  </table>
			</td>
		   </tr>
        </table>
      
   
   </body>
</html>
  `
}

module.exports = resetTemplate
