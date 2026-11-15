import React, { useState } from 'react';
import { X, Github, Linkedin, FileCode, Check, AlertCircle, Sparkles, RefreshCw, Edit3 } from 'lucide-react';
import { ResumeData, ResumePreset } from '../../types/resume';
import { fetchGitHubResume, parseLinkedInData, dhyandevResume, dafneResume } from '../../lib/resumeDataPuller';

interface DataPullerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: ResumeData;
  onApplyData: (data: ResumeData, presetName?: ResumePreset) => void;
}

export const DataPullerModal: React.FC<DataPullerModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onApplyData
}) => {
  const [activeTab, setActiveTab] = useState<'github' | 'linkedin' | 'edit' | 'json' | 'presets'>('github');

  // GitHub state
  const [githubUsername, setGithubUsername] = useState('dhyandevp');
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState<string | null>(null);
  const [githubSuccess, setGithubSuccess] = useState<string | null>(null);

  // LinkedIn state
  const [linkedinUrl, setLinkedinUrl] = useState(currentData.linkedinUrl);
  const [linkedinText, setLinkedinText] = useState('');
  const [linkedinStatus, setLinkedinStatus] = useState<string | null>(null);

  // Quick edit state
  const [editForm, setEditForm] = useState<ResumeData>(currentData);

  // JSON state
  const [jsonText, setJsonText] = useState(() => JSON.stringify(currentData, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFetchGithub = async () => {
    if (!githubUsername.trim()) return;
    setGithubLoading(true);
    setGithubError(null);
    setGithubSuccess(null);
    try {
      const data = await fetchGitHubResume(githubUsername.trim());
      onApplyData(data, 'custom');
      setGithubSuccess(`Successfully pulled @${githubUsername}'s profile and top repositories!`);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      setGithubError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
    } finally {
      setGithubLoading(false);
    }
  };

  const handleParseLinkedIn = () => {
    if (!linkedinText.trim() && !linkedinUrl.trim()) {
      setLinkedinStatus('Please provide a LinkedIn profile URL or paste profile text.');
      return;
    }
    const combined = `${linkedinUrl}\n${linkedinText}`;
    const updated = parseLinkedInData(combined, currentData);
    onApplyData(updated, 'custom');
    setLinkedinStatus('LinkedIn data parsed and applied!');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      onApplyData(parsed, 'custom');
      setJsonError(null);
      onClose();
    } catch (err) {
      setJsonError('Invalid JSON format: ' + (err instanceof Error ? err.message : 'Parse error'));
    }
  };

  const handleSaveEdit = () => {
    onApplyData(editForm, 'custom');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in print:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl text-white overflow-hidden flex flex-col max-h-[min(90dvh,calc(100dvh-2rem))]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <h2 id="modal-title" className="font-mono text-sm font-bold tracking-wider uppercase text-neutral-200">
              Resume Data Engine // Pull from Everywhere
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 pt-3 border-b border-neutral-800 bg-neutral-950/40 gap-2 overflow-x-auto touch-pan-y no-scrollbar text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('github')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'github'
                ? 'border-blue-500 text-white font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Github className="w-4 h-4 text-purple-400" />
            <span>GitHub Live API</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('linkedin')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'linkedin'
                ? 'border-blue-500 text-white font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>LinkedIn Sync</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'presets'
                ? 'border-blue-500 text-white font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Presets</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'edit'
                ? 'border-blue-500 text-white font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Edit3 className="w-4 h-4 text-emerald-400" />
            <span>Quick Edit</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'json'
                ? 'border-blue-500 text-white font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FileCode className="w-4 h-4 text-neutral-400" />
            <span>JSON Resume</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto overscroll-contain flex-1 text-sm font-sans space-y-4">
          {/* TAB 1: GITHUB LIVE API */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                <h3 className="font-mono text-xs text-neutral-300 font-bold uppercase flex items-center gap-2">
                  <Github className="w-4 h-4 text-purple-400" />
                  Direct GitHub REST Integration
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Pulls live profile telemetry, repositories, stars count, commit activity, and dominant programming languages directly from GitHub to populate the resume.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-neutral-400 uppercase">
                  GitHub Username
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-3 flex items-center text-neutral-500 font-mono text-xs">@</span>
                    <input
                      type="text"
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                      placeholder="e.g. dhyandevp"
                      autoCapitalize="none"
                      autoCorrect="off"
                      enterKeyHint="go"
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg pl-7 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 font-mono"
                      onKeyDown={(e) => e.key === 'Enter' && handleFetchGithub()}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleFetchGithub}
                    disabled={githubLoading}
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {githubLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Pulling...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Pull Live Data</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {githubError && (
                <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{githubError}</span>
                </div>
              )}

              {githubSuccess && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{githubSuccess}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LINKEDIN SYNC */}
          {activeTab === 'linkedin' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
                <h3 className="font-mono text-xs text-neutral-300 font-bold uppercase flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  LinkedIn Profile & Resume Sync
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Provide your LinkedIn Profile URL, or paste the text from your LinkedIn profile or LinkedIn &ldquo;Save to PDF&rdquo; export. The parser extracts your name, headline, experience, and contact details.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-neutral-400 uppercase">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  inputMode="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  autoCapitalize="none"
                  autoCorrect="off"
                  enterKeyHint="go"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-neutral-400 uppercase">
                  Paste LinkedIn Profile Text or Export
                </label>
                <textarea
                  rows={5}
                  value={linkedinText}
                  onChange={(e) => setLinkedinText(e.target.value)}
                  placeholder="Paste your LinkedIn summary, experience details, or text copied from your profile..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 font-mono leading-relaxed"
                />
              </div>

              {linkedinStatus && (
                <div className="p-3 rounded-lg bg-blue-950/60 border border-blue-800/80 text-blue-200 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0 text-blue-400" />
                  <span>{linkedinStatus}</span>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleParseLinkedIn}
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Parse & Apply to Resume</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-400">
                Instantly toggle between verified developer profiles or reset to default:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Preset 1: Dhyandev P. */}
                <div className="p-4 rounded-xl border border-neutral-700 bg-neutral-950/60 hover:border-neutral-500 transition-colors flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white">Dhyandev P.</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                        Default
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Co-Founder @ Wayve Enterprises. Systems & ML Engineer with FLARE V2, SmartCity IoT, Lid Switch GNOME, and OpenCV edge pipelines.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onApplyData(dhyandevResume, 'dhyandev');
                      onClose();
                    }}
                    className="w-full py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                  >
                    Load Dhyandev P.
                  </button>
                </div>

                {/* Preset 2: Dafne Salvatori */}
                <div className="p-4 rounded-xl border border-neutral-700 bg-neutral-950/60 hover:border-neutral-500 transition-colors flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white">Dafne Salvatori</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-400 border border-purple-800">
                        Reference PDF
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Exact 1:1 match of reference image & PDF. &ldquo;Get Daff*d&rdquo;, 25,000+ delegates, 6.8x ABC site growth, SBC Summit Lisbon, Logifuture.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onApplyData(dafneResume, 'dafne');
                      onClose();
                    }}
                    className="w-full py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                  >
                    Load Dafne Salvatori (Reference)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: QUICK EDIT */}
          {activeTab === 'edit' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase">Brand Wordmark</label>
                  <input
                    type="text"
                    value={editForm.brandName}
                    onChange={(e) => setEditForm({ ...editForm, brandName: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-neutral-400 uppercase">Bold Headline</label>
                <textarea
                  rows={2}
                  value={editForm.headline}
                  onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-neutral-400 uppercase">Left-Bordered Callout Quote</label>
                <textarea
                  rows={2}
                  value={editForm.calloutQuote}
                  onChange={(e) => setEditForm({ ...editForm, calloutQuote: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase">Website URL</label>
                  <input
                    type="text"
                    value={editForm.websiteUrl}
                    onChange={(e) => setEditForm({ ...editForm, websiteUrl: e.target.value, websiteDisplay: e.target.value.replace(/^https?:\/\//, '') })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase">Coin Initials</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={editForm.badgeInitials}
                    onChange={(e) => setEditForm({ ...editForm, badgeInitials: e.target.value.toUpperCase() })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: RAW JSON RESUME */}
          {activeTab === 'json' && (
            <div className="space-y-3">
              <p className="text-xs text-neutral-400">
                Directly edit or export the complete resume data model in JSON format:
              </p>
              <textarea
                rows={12}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-xs text-white font-mono leading-normal focus:outline-none focus:border-blue-500"
              />
              {jsonError && (
                <div className="p-2.5 rounded bg-rose-950 text-rose-300 text-xs">
                  {jsonError}
                </div>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setJsonText(JSON.stringify(currentData, null, 2))}
                  className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white font-mono text-xs transition-colors cursor-pointer"
                >
                  Reset JSON
                </button>
                <button
                  type="button"
                  onClick={handleApplyJson}
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                >
                  Apply JSON
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
