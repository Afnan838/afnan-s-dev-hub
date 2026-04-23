import { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, RotateCcw, Check, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface VoiceRecorderProps {
  onSave: (blob: Blob) => void;
  onClear: () => void;
}

export const VoiceRecorder = ({ onSave, onClear }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      audioChunksRef.current = [];
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access denied or not available.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleSave = () => {
    if (audioBlob) {
      onSave(audioBlob);
    }
  };

  const handleClear = () => {
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setRecordingTime(0);
    onClear();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (audioUrl) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-[#121827] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400" /> Recording saved
          </span>
          <span className="text-xs text-slate-400">{formatTime(recordingTime)}</span>
        </div>
        <audio src={audioUrl} controls className="w-full h-8" />
        <div className="flex gap-2 justify-end mt-2">
          <Button variant="outline" size="sm" onClick={handleClear} className="text-destructive border-destructive/20 hover:bg-destructive/10">
            <Trash2 className="h-3 w-3 mr-2" /> Discard
          </Button>
          <Button size="sm" onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 text-white">
            <Check className="h-3 w-3 mr-2" /> Attach to Feedback
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-border/50 bg-[#121827] p-4">
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${isRecording ? 'bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse' : 'bg-blue-500/10'}`}>
          {isRecording ? <Mic className="h-5 w-5 text-red-500" /> : <Mic className="h-5 w-5 text-blue-400" />}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{isRecording ? "Recording..." : "Record Voice Feedback"}</p>
          <p className="text-xs text-slate-400">{formatTime(recordingTime)}</p>
        </div>
      </div>
      
      {isRecording ? (
        <Button variant="destructive" size="icon" onClick={stopRecording} className="h-10 w-10 rounded-full animate-in fade-in zoom-in">
          <Square className="h-4 w-4" fill="currentColor" />
        </Button>
      ) : (
        <Button onClick={startRecording} variant="outline" size="sm" className="bg-transparent border-blue-500/30 text-blue-400 hover:bg-blue-500/10 rounded-full">
          Start Recording
        </Button>
      )}
    </div>
  );
};
