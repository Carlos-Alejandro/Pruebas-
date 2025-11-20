import ReCAPTCHA from "react-google-recaptcha";

import React from "react";
import bgCareers from "../../assets/Carrers/carrers.png";
import { useLanguage } from "../../common/i18n/LanguageContext";
import careersDict from "../../common/i18n/careers.json";


const Careers: React.FC = () => {
	const { language } = useLanguage();
	const t = (key: string) => (careersDict as any)[language][key] || key;

	// Clave de test de Google reCAPTCHA v2 (puedes cambiarla por la tuya en producción)
	const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
	const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);
	const [attachedFile, setAttachedFile] = React.useState<File | null>(null);
	const [fileError, setFileError] = React.useState<string | null>(null);

	const handleCaptchaChange = (value: string | null) => {
		setCaptchaValue(value);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		if (file && file.size > 3 * 1024 * 1024) {
			setFileError('El archivo supera el máximo de 3MB');
			setAttachedFile(null);
		} else {
			setFileError(null);
			setAttachedFile(file);
		}
	};

	return (
		<section style={{ width: '100%', minHeight: '100vh', background: '#fafafa' }}>
			{/* Imagen de fondo */}
			<div
				style={{
					width: '100%',
					height: 'clamp(180px, 32vw, 360px)',
					backgroundImage: `url(${bgCareers})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					marginBottom: 'clamp(24px, 4vw, 48px)',
				}}
			/>
			{/* Contenido principal */}
			<div
				style={{
					maxWidth: 1920,
					margin: '0 auto',
					padding: 'clamp(16px, 3vw, 48px)',
					display: 'flex',
					flexDirection: 'column',
					gap: 'clamp(16px, 2vw, 32px)',
					fontFamily: 'Montserrat, sans-serif',
				}}
			>
				{/* Título y subtítulo */}
				<div style={{ marginBottom: 'clamp(12px, 2vw, 24px)' }}>
						{(() => {
							const title = t('title');
							const dashIdx = title.indexOf('—');
							if (dashIdx === -1) {
								return (
									<h1
										style={{
											fontWeight: 700,
											fontSize: 'clamp(22px, 2.5vw, 38px)',
											margin: 0,
											letterSpacing: 0.2,
											display: 'inline-block',
											color: '#111',
										}}
									>
										{title}
									</h1>
								);
							}
							return (
								<h1
									style={{
										fontWeight: 700,
										fontSize: 'clamp(22px, 2.5vw, 38px)',
										margin: 0,
										letterSpacing: 0.2,
										display: 'inline-block',
										color: '#111',
									}}
								>
									{title.slice(0, dashIdx)}
									<span style={{ color: '#868686', fontWeight: 700 }}>
										{title.slice(dashIdx)}
									</span>
								</h1>
							);
						})()}
					<p style={{
						fontSize: 'clamp(14px, 1.2vw, 18px)',
						margin: 'clamp(8px, 1vw, 16px) 0 0 0',
						color: '#111',
						fontWeight: 400,
						maxWidth: 900,
					}}>
						{t('subtitle')}
					</p>
				</div>
				{/* Formulario y adjunto */}
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: 'clamp(16px, 2vw, 32px)',
						width: '100%',
					}}
				>
					{/* Columna izquierda: formulario */}
					<div style={{ flex: 2, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 1.5vw, 24px)' }}>
						<div style={{ display: 'flex', gap: 'clamp(12px, 1vw, 20px)' }}>
							<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
								<label style={{ fontWeight: 700, fontSize: 'clamp(13px, 1vw, 16px)', color: '#111' }}>{t('name')}<span style={{ color: 'red' }}>*</span></label>
								<input style={{ padding: 'clamp(8px, 1vw, 14px)', fontSize: 'clamp(13px, 1vw, 16px)', border: '1px solid #111', borderRadius: 0, color: '#111' }} />
							</div>
							<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
								<label style={{ fontWeight: 700, fontSize: 'clamp(13px, 1vw, 16px)', color: '#111' }}>{t('lastname')}<span style={{ color: 'red' }}>*</span></label>
								<input style={{ padding: 'clamp(8px, 1vw, 14px)', fontSize: 'clamp(13px, 1vw, 16px)', border: '1px solid #111', borderRadius: 0, color: '#111' }} />
							</div>
						</div>
						<div style={{ display: 'flex', gap: 'clamp(12px, 1vw, 20px)' }}>
							<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
								<label style={{ fontWeight: 700, fontSize: 'clamp(13px, 1vw, 16px)', color: '#111' }}>{t('email')}<span style={{ color: 'red' }}>*</span></label>
								<input style={{ padding: 'clamp(8px, 1vw, 14px)', fontSize: 'clamp(13px, 1vw, 16px)', border: '1px solid #111', borderRadius: 0, color: '#111' }} />
							</div>
							<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
								<label style={{ fontWeight: 700, fontSize: 'clamp(13px, 1vw, 16px)', color: '#111' }}>{t('phone')}<span style={{ color: 'red' }}>*</span></label>
								<input style={{ padding: 'clamp(8px, 1vw, 14px)', fontSize: 'clamp(13px, 1vw, 16px)', border: '1px solid #111', borderRadius: 0, color: '#111' }} />
							</div>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
							<label style={{ fontWeight: 700, fontSize: 'clamp(13px, 1vw, 16px)', color: '#111' }}>{t('message')}</label>
							<textarea style={{ padding: 'clamp(8px, 1vw, 14px)', fontSize: 'clamp(13px, 1vw, 16px)', border: '1px solid #111', borderRadius: 0, minHeight: 160, height: '100%', resize: 'vertical', color: '#111', boxSizing: 'border-box', width: '100%' }} />
						</div>
					</div>
					{/* Columna derecha: adjunto y captcha */}
					<div style={{ flex: 1.2, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 1.5vw, 24px)' }}>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
							<label style={{ fontWeight: 700, fontSize: 'clamp(13px, 1vw, 16px)', color: '#111' }}>{t('attach')}<span style={{ color: 'red' }}>*</span></label>
							<div
								style={{
									border: '1.5px dashed #bbb',
									borderRadius: 6,
									background: '#f5f5f5',
									minHeight: 'clamp(120px, 20vw, 160px)',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									padding: 'clamp(16px, 2vw, 32px)',
									textAlign: 'center',
									color: '#111',
									fontSize: 'clamp(13px, 1vw, 15px)',
									position: 'relative',
									cursor: 'pointer',
								}}
								onClick={() => document.getElementById('file-input-careers')?.click()}
							>
								<input
									id="file-input-careers"
									type="file"
									accept=".pdf,.doc,.docx,.zip,.rar,.jpg,.jpeg,.png,.ppt,.pptx,.xls,.xlsx,.txt"
									style={{ display: 'none' }}
									onChange={handleFileChange}
								/>
								{attachedFile ? (
									<>
										<span style={{ color: '#111', fontWeight: 600 }}>{attachedFile.name}</span>
										<span style={{ fontSize: 'clamp(11px, 0.8vw, 13px)', color: '#888', marginTop: 4 }}>{(attachedFile.size / 1024 / 1024).toFixed(2)} MB</span>
									</>
								) : (
									<>
										{t('drop')}<br />
										<span style={{ fontSize: 'clamp(11px, 0.8vw, 13px)', color: '#888' }}>{t('maxsize')}</span>
									</>
								)}
								{fileError && <span style={{ color: 'red', fontSize: 12, marginTop: 6 }}>{fileError}</span>}
							</div>
						</div>
						<div style={{ display: 'flex', gap: 'clamp(8px, 1vw, 16px)', alignItems: 'center' }}>
							<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
								<label style={{ fontWeight: 700, fontSize: 'clamp(13px, 1vw, 16px)', color: '#111' }}>{t('portfolio')}</label>
								<input style={{ padding: 'clamp(8px, 1vw, 14px)', fontSize: 'clamp(13px, 1vw, 16px)', border: '1px solid #111', borderRadius: 0, color: '#111' }} />
							</div>
							{/* Google reCAPTCHA real */}
							<div
								style={{
									minWidth: 'clamp(120px, 12vw, 200px)',
									minHeight: 'clamp(32px, 3vw, 60px)',
									width: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '0 clamp(8px, 2vw, 24px)',
									marginLeft: 'clamp(8px, 1vw, 20px)',
								}}
							>
								<div
										style={{
												width: '100%',
												display: 'flex',
												justifyContent: 'center',
												maxWidth: 304,
												minWidth: 180,
												// Escalado responsivo con media queries en línea
												transform: 'scale(0.92)',
												transformOrigin: '0 0',
										}}
								>
										<style>{`
												@media (max-width: 600px) {
													.recaptcha-scale {
														transform: scale(0.78) !important;
													}
												}
												@media (max-width: 400px) {
													.recaptcha-scale {
														transform: scale(0.65) !important;
													}
												}
										`}</style>
																<div className="recaptcha-scale">
																	<ReCAPTCHA
																			sitekey={RECAPTCHA_SITE_KEY}
																			onChange={handleCaptchaChange}
																			theme="light"
																	/>
																</div>
  </div>
							</div>
						</div>
						<button
							style={{
								background: '#111',
								color: '#fff',
								fontWeight: 700,
								fontFamily: 'Montserrat, sans-serif',
								fontSize: 'clamp(15px, 1.2vw, 20px)',
								padding: 'clamp(10px, 1vw, 18px) clamp(32px, 4vw, 64px)',
								border: 'none',
								borderRadius: 4,
								marginTop: 'clamp(8px, 1vw, 24px)',
								cursor: captchaValue ? 'pointer' : 'not-allowed',
								letterSpacing: 0.2,
								opacity: captchaValue ? 1 : 0.5,
							}}
							disabled={!captchaValue}
						>
							{t('send')}
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Careers;
