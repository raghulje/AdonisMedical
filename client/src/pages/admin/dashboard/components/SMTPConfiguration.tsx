import { useState } from 'react';

interface SMTPConfig {
  host: string;
  port: string;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
  encryption: 'none' | 'ssl' | 'tls';
  enabled: boolean;
}

export default function SMTPConfiguration() {
  const [isEditing, setIsEditing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const [smtpConfig, setSmtpConfig] = useState<SMTPConfig>({
    host: 'smtp.gmail.com',
    port: '587',
    username: 'your-email@gmail.com',
    password: '',
    fromEmail: 'noreply@adonismedical.com',
    fromName: 'Adonis Medical',
    encryption: 'tls',
    enabled: true
  });

  const [testEmail, setTestEmail] = useState('');

  const handleSave = () => {
    console.log('Saving SMTP configuration:', smtpConfig);
    setIsEditing(false);
    setTestResult({ success: true, message: 'SMTP configuration saved successfully!' });
    setTimeout(() => setTestResult(null), 5000);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleTestConnection = async () => {
    if (!testEmail) {
      setTestResult({ success: false, message: 'Please enter a test email address' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    // Simulate API call
    setTimeout(() => {
      setIsTesting(false);
      setTestResult({
        success: true,
        message: `Test email sent successfully to ${testEmail}! Please check your inbox.`
      });
    }, 2000);
  };

  const commonSMTPProviders = [
    {
      name: 'Gmail',
      host: 'smtp.gmail.com',
      port: '587',
      encryption: 'tls' as const,
      note: 'Use App Password for Gmail accounts with 2FA enabled'
    },
    {
      name: 'Outlook/Office 365',
      host: 'smtp.office365.com',
      port: '587',
      encryption: 'tls' as const,
      note: 'Use your Microsoft account credentials'
    },
    {
      name: 'Yahoo Mail',
      host: 'smtp.mail.yahoo.com',
      port: '587',
      encryption: 'tls' as const,
      note: 'Generate an app password in Yahoo account settings'
    },
    {
      name: 'SendGrid',
      host: 'smtp.sendgrid.net',
      port: '587',
      encryption: 'tls' as const,
      note: 'Use "apikey" as username and your API key as password'
    },
    {
      name: 'Mailgun',
      host: 'smtp.mailgun.org',
      port: '587',
      encryption: 'tls' as const,
      note: 'Use your Mailgun SMTP credentials'
    }
  ];

  const applyProvider = (provider: typeof commonSMTPProviders[0]) => {
    setSmtpConfig({
      ...smtpConfig,
      host: provider.host,
      port: provider.port,
      encryption: provider.encryption
    });
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      {/* SMTP Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#1F2937]">SMTP Configuration</h2>
            <p className="text-sm text-[#6B7280] mt-1">Configure email server settings for sending emails</p>
          </div>
          <div className="flex items-center space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-edit-line mr-2"></i>Edit Configuration
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-[#F3F4F6] text-[#6B7280] rounded-lg hover:bg-[#E5E7EB] transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  Save Configuration
                </button>
              </>
            )}
          </div>
        </div>

        {/* Status Alert */}
        {testResult && (
          <div className={`mb-6 p-4 rounded-lg border ${
            testResult.success 
              ? 'bg-[#D1FAE5] border-[#6EE7B7] text-[#065F46]' 
              : 'bg-[#FEE2E2] border-[#FCA5A5] text-[#991B1B]'
          }`}>
            <div className="flex items-center space-x-3">
              <i className={`${testResult.success ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'} text-xl`}></i>
              <p className="text-sm font-medium">{testResult.message}</p>
            </div>
          </div>
        )}

        {isEditing ? (
          <div className="space-y-6">
            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
              <div>
                <h3 className="text-sm font-semibold text-[#1F2937]">Enable SMTP</h3>
                <p className="text-xs text-[#6B7280] mt-1">Turn on/off email sending functionality</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={smtpConfig.enabled}
                  onChange={(e) => setSmtpConfig({ ...smtpConfig, enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#D1D5DB] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#BFDBFE] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D1D5DB] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
              </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Server Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1F2937] border-b pb-2">Server Settings</h3>
                
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">SMTP Host</label>
                  <input
                    type="text"
                    value={smtpConfig.host}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, host: e.target.value })}
                    className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                    placeholder="smtp.example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">SMTP Port</label>
                  <input
                    type="text"
                    value={smtpConfig.port}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, port: e.target.value })}
                    className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                    placeholder="587"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Encryption</label>
                  <select
                    value={smtpConfig.encryption}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, encryption: e.target.value as SMTPConfig['encryption'] })}
                    className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="none">None</option>
                    <option value="ssl">SSL</option>
                    <option value="tls">TLS (Recommended)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Username</label>
                  <input
                    type="text"
                    value={smtpConfig.username}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, username: e.target.value })}
                    className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                    placeholder="your-email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Password</label>
                  <input
                    type="password"
                    value={smtpConfig.password}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, password: e.target.value })}
                    className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Sender Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1F2937] border-b pb-2">Sender Settings</h3>
                
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">From Email</label>
                  <input
                    type="email"
                    value={smtpConfig.fromEmail}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, fromEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                    placeholder="noreply@example.com"
                  />
                  <p className="text-xs text-[#6B7280] mt-1">Email address that will appear as sender</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">From Name</label>
                  <input
                    type="text"
                    value={smtpConfig.fromName}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, fromName: e.target.value })}
                    className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                    placeholder="Your Company Name"
                  />
                  <p className="text-xs text-[#6B7280] mt-1">Name that will appear as sender</p>
                </div>

                {/* Test Email Section */}
                <div className="mt-6 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                  <h4 className="text-sm font-semibold text-[#1F2937] mb-3">Test Email Connection</h4>
                  <div className="space-y-3">
                    <input
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                      placeholder="test@example.com"
                    />
                    <button
                      onClick={handleTestConnection}
                      disabled={isTesting}
                      className="w-full px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isTesting ? (
                        <>
                          <i className="ri-loader-4-line animate-spin mr-2"></i>
                          Sending Test Email...
                        </>
                      ) : (
                        <>
                          <i className="ri-mail-send-line mr-2"></i>
                          Send Test Email
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-[#1F2937]">Status</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    smtpConfig.enabled 
                      ? 'bg-[#D1FAE5] text-[#065F46]' 
                      : 'bg-[#FEE2E2] text-[#991B1B]'
                  }`}>
                    {smtpConfig.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>

              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                <h3 className="text-sm font-semibold text-[#1F2937] mb-3">Server Settings</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Host:</span>
                    <span className="text-[#1F2937] font-medium">{smtpConfig.host}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Port:</span>
                    <span className="text-[#1F2937] font-medium">{smtpConfig.port}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Encryption:</span>
                    <span className="text-[#1F2937] font-medium uppercase">{smtpConfig.encryption}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Username:</span>
                    <span className="text-[#1F2937] font-medium">{smtpConfig.username}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                <h3 className="text-sm font-semibold text-[#1F2937] mb-3">Sender Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">From Email:</span>
                    <span className="text-[#1F2937] font-medium">{smtpConfig.fromEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">From Name:</span>
                    <span className="text-[#1F2937] font-medium">{smtpConfig.fromName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Common SMTP Providers */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-6">
        <h2 className="text-xl font-bold text-[#1F2937] mb-4">Common SMTP Providers</h2>
        <p className="text-sm text-[#6B7280] mb-6">Quick setup with popular email service providers</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {commonSMTPProviders.map((provider) => (
            <div key={provider.name} className="border border-[#E5E7EB] rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#1F2937]">{provider.name}</h3>
                <button
                  onClick={() => applyProvider(provider)}
                  className="px-3 py-1 bg-[#2563EB] text-white text-xs rounded-lg hover:bg-[#1D4ED8] transition-all cursor-pointer whitespace-nowrap"
                >
                  Use This
                </button>
              </div>
              <div className="space-y-1 text-xs text-[#6B7280] mb-3">
                <p><strong>Host:</strong> {provider.host}</p>
                <p><strong>Port:</strong> {provider.port}</p>
                <p><strong>Encryption:</strong> {provider.encryption.toUpperCase()}</p>
              </div>
              <p className="text-xs text-[#6B7280] bg-[#F9FAFB] p-2 rounded">
                <i className="ri-information-line mr-1"></i>
                {provider.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Help & Documentation */}
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <i className="ri-information-line text-[#2563EB] text-2xl mt-0.5"></i>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-[#1E40AF] mb-2">SMTP Configuration Help</h3>
            <ul className="text-sm text-[#1E40AF] space-y-2">
              <li><strong>Port 587 (TLS):</strong> Recommended for most providers, uses STARTTLS encryption</li>
              <li><strong>Port 465 (SSL):</strong> Uses SSL encryption, supported by some providers</li>
              <li><strong>Port 25:</strong> Standard SMTP port, often blocked by ISPs</li>
              <li><strong>Gmail Users:</strong> Enable "Less secure app access" or use App Passwords with 2FA</li>
              <li><strong>Testing:</strong> Always send a test email after configuration to verify settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
