package com.reelreview.repository;

import com.reelreview.domain.board.BoardDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<BoardDTO, Integer> {

    Page<BoardDTO> findByTitleContainingOrWriterContaining(String titleKeyword, String writerKeyword, Pageable pageable);

}
