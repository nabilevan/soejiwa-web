import { useId, useState, type ChangeEvent } from "react"
import { UPLOAD_ACCEPT, UPLOAD_MAX_BYTES } from "../../data/constants"
import type { AttachedFile } from "../../types"
import { Icon } from "./Icon"

function formatSize(bytes: number) {
  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

type FileUploadProps = {
  value: AttachedFile | null
  onChange: (file: AttachedFile | null) => void
  error?: string
}

/**
 * Unggah bukti pendukung (PDF/JPG/PNG, maks. 5 MB).
 * Jika belum ada berkas → kotak putus-putus. Jika sudah ada → kartu berkas + "Ganti berkas".
 */
export function FileUpload({ value, onChange, error }: FileUploadProps) {
  const inputId = useId()
  const [sizeError, setSizeError] = useState("")

  function handleSelect(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0]
    event.target.value = ""
    if (!selected) return
    if (selected.size > UPLOAD_MAX_BYTES) {
      setSizeError("Ukuran berkas melebihi 5 MB.")
      return
    }
    setSizeError("")
    onChange({ name: selected.name, size: formatSize(selected.size) })
  }

  const message = sizeError || error

  return (
    <div>
      <input id={inputId} type="file" accept={UPLOAD_ACCEPT} className="sr-only" onChange={handleSelect} />

      {value ? (
        <div className="upload">
          <div className="upload__file">
            <Icon name="file-check" size={22} />
            <span className="upload__meta">
              <span className="upload__name">{value.name}</span>
              <span className="upload__info">{value.size} • Berhasil diunggah</span>
            </span>
            <button type="button" className="upload__remove" onClick={() => onChange(null)} aria-label="Hapus berkas">
              <Icon name="close" size={18} />
            </button>
          </div>
          <div className="upload__replace">
            <label htmlFor={inputId}>
              <Icon name="upload" size={17} />
              Ganti berkas
            </label>
            <span>PDF/JPG/PNG, maks. 5 MB</span>
          </div>
        </div>
      ) : (
        <label htmlFor={inputId} className={`dropzone ${message ? "is-error" : ""}`}>
          <Icon name="upload" size={24} />
          <b>Pilih atau unggah berkas</b>
          <small>PDF, JPG, PNG • Maks. 5 MB</small>
        </label>
      )}

      {message && <p className="upload__error">{message}</p>}
    </div>
  )
}

type FileCardProps = {
  file: AttachedFile
  action?: "view" | "download"
  meta?: string
}

/** Berkas yang sudah terunggah (hanya baca), dengan tombol lihat/unduh. */
export function FileCard({ file, action = "view", meta }: FileCardProps) {
  return (
    <div className="file-card">
      <Icon name={action === "view" ? "file-check" : "file"} size={22} />
      <span className="upload__meta">
        <span className="upload__name">{file.name}</span>
        <span className="upload__info">{meta ?? `${file.size} • Berhasil diunggah`}</span>
      </span>
      <button type="button" className="icon-btn" aria-label={action === "view" ? "Lihat berkas" : "Unduh berkas"}>
        <Icon name={action === "view" ? "eye" : "download"} size={20} />
      </button>
    </div>
  )
}
