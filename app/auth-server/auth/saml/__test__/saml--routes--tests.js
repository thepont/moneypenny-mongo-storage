describe('saml--routes', () => {
	describe('/auth/saml/login/callback', () => {
		describe('POST', () => {
			it('Gets the userId from the refresh token object', () =>{
				it('calls passport authenticate with the saml stratergy', ()=>{
					
				})
				it('calls next(err) if an error occours with authentication', ()=>{
					
				})
				it('redirects to login if no user is found', ()=>{
					
				})
			});
		});
	});
	describe('/auth/saml/login', () => {
		describe('GET', () => {
		
		});
	});
	describe('/auth/test/local/login', () => {
		describe('POST', () => {
		
		});
	});
});