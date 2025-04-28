import request from 'supertest';
import puppeteer from 'puppeteer';

export const getAPI = () => {
    const accessToken =  process.env.ACCESS_TOKEN;// await getAccessToken();
    return request(`http://localhost:3000/api/mgmt/network/${process.env.NETWORK}`)
        
};

export const setheaders = async (req: any) => {
    const accessToken = process.env.ACCESS_TOKEN;
    return req.set('Authorization', `${accessToken}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('tenantgroupcode', process.env.TENANT_GROUP_CODE!);
}

//export const api = request(`${process.env.BASE_URL}/api/mgmt/network/${process.env.NETWORK}`);   

// export async function getAccessToken(): Promise<string> {
//     //const loginUrl = `${process.env.COGNITO_DOMAIN}/login?client_id=${process.env.CLIENT_ID}&response_type=token&scope=openid+profile&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F`;
//     const loginUrl = 'https://backstage-dev-test.auth.us-west-2.amazoncognito.com/login?client_id=149t9m9ao0emem709s1v9gcipm&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&response_type=code&scope=openid+profile&state=adccf93a6adb400ba48f1f40b5743d3d&code_challenge=NlVsI4GkO24harA0_g-Kza8wyjuHEqpCTrBtO7en3ec&code_challenge_method=S256&response_mode=query';
//     console.log('Login URL:', loginUrl);
//     const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
//     const page = await browser.newPage();
  
//     await page.goto(loginUrl);
    
//     // Simulate user login (fill and submit login form)
//     await page.waitForSelector('input[name="username"]', { visible: true });
//     await page.type('input[name="username"]', process.env.COGNITO_USERNAME!);
//     await page.type('input[name="password"]', process.env.COGNITO_PASSWORD!);
//     await page.click('button[type="submit"]');
  
//     await page.waitForNavigation({ waitUntil: 'networkidle2' });
  
//     const redirectedUrl = page.url(); // Should contain access_token in hash fragment
  
//     await browser.close();
  
//     const match = redirectedUrl.match(/access_token=([^&]*)/);
//     if (!match || !match[1]) throw new Error('Access token not found in redirect URL');
  
//     return match[1];
//   }