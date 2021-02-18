import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5'

@Injectable({
  providedIn: 'root'
})
export class TypingDNAService {
  base_url = "http://192.53.165.83:30666";
  auto_url = "/typingdna";
  get_user_url = "/typingdna/getUser";

  constructor(private http: HttpClient) {}

  public auto(idBeforeHash: string, typingPattern: string) {
    let idHash = this.hashID(idBeforeHash);
    return this.http.post(this.base_url+this.auto_url, {
      id: idHash,
      tp: typingPattern
    });
  }

  public getUser(idBeforeHash: string) {
    let idHash = this.hashID(idBeforeHash);
    return this.http.post(this.base_url+this.get_user_url, {
      id: idHash 
    });
  }

  private hashID(id: string): string {
    return Md5.hashStr("twitter" + id).toString();
  }
}
